const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const validateSession = require("../middleware/validate-session");


const router = Router();

/*
======================
   Register Account
======================
*/

router.post("/register", async function (req, res) {
  
  const {username, email, password, role} = req.body;
  
  try{
    const User = await UserModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      role
    });

    const token = jwt.sign({
      id: User.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24
    }
    );

    res.status(200).json({
      message: "Registration Succesful!",
      user: {
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 10),
        sessionToken: token
      },
    });
  
  }catch(e) {
    if (e instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "Email or Username already in use.",
        error: e
      });
    } else {
      res.status(500).json({
        message: "Unable to register user.",
        error: e
      });
    }
    
  }
 
});

/*
======================
        Login
======================
*/

router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  
  try{
    let loginUser = await UserModel.findOne({
      where: {
        username: username,
      },
    });

    if (loginUser) {
      let passwordComparison = await bcrypt.compare(password, loginUser.password);

      if (passwordComparison) {
        let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24});

        res.status(200).json({
          user: loginUser,
          message: "Login Succesful!",
          sessionToken: token
        });
      } else {
        res.status(401).json({
          message: "Incorrect username or password"
        });
      }
    } else {
      res.status(401).json({
        message: "Incorrect username or password"
      });
    }

  } catch (e) {
    res.status(500).json({
      message: "Login Failed",
      error: e
    })
  }
});

/*
======================
    Get User Info
======================
*/

router.get("/mine", validateSession, async (req, res) => {
  let myId = req.user.id
  try {

    const userAccount = await UserModel.findOne({
      where: {
        id: myId
      }
    });
    res.status(200).json(userAccount);
  } catch (e) {

    res.status(500).json({
      error: e
    });
  }
});

/*
======================
    Edit Account Info
======================
*/

router.put("/edit", validateSession, async (req, res) => {
  const {username, email, password} = req.body;
  const myId = req.user.id;

  const query = {
    where: {
      id: myId,
    }
  };

  const updatedInfo = {
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 10),
  };

  try {

    const edit = await UserModel.update(updatedInfo, query);
    res.status(200).json({
      message: "Account Information updated succesfully",
      updatedInfo,
      edit
    });
  } catch (e) {
    res.status(500).json({
      error: e
    });
  };
});

/*
======================
   Delete Account
======================
*/

router.delete("/delete", validateSession, async (req, res) => {
  const myId = req.user.id;

  try {

    const query = {
      where: {
        id: myId,
      }
    };

    await UserModel.destroy(query);
    res.status(200).json({
      message: "Account deleted"
    });
  } catch (e) {

    res.status(500).json({
      error: e
    });
  };
});

module.exports = router;