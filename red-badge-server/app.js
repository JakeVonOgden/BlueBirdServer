require("dotenv").config();

const Express = require("express");
const db = require("./db");
const app = Express();
const middlewares = require("./middleware");
const controllers = require("./controllers");

app.use(Express.json());
app.use(middlewares.CORS)
app.use("/user", controllers.User);
app.use("/review", controllers.Review);
app.use("/comment", controllers.Comment);

const resetDatabase = {force:true}

db.authenticate()
  .then(() => db.sync())
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[server]: App is listening on ${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });