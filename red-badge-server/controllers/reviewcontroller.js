const { Router } = require("express");
const validateSession = require("../middleware/validate-session");
const { ReviewModel } = require("../models");

const router = Router();


/*
======================
   Review Create
======================
*/

router.post("/create", validateSession, async (req, res) => {
    
    const {anime, rating, content, image} = req.body;

    try {
        await ReviewModel.create({
            anime: anime,
            content: content,
            rating: rating,
            image: image,
            owner: req.user.username,
            userId: req.user.id,
        })
        .then(
            review => {
                res.status(200).json({
                    review: review,
                    message: "review listed"
                });
            }
        )

    } catch (e) {
        
        res.status(500).json({
            error: `Failed to list review: ${e}`
        });
    };
});


/*
=======================
   Get Your Reviews
=======================
*/

router.get("/mine", validateSession, async (req, res) => {
    let { id } = req.user;

    try {

        const entries = await ReviewModel.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(entries);
    } catch (e) {

        res.status(500).json({
            error: e
        });
    };
});


/*
==========================
   Get Reviews by Anime
==========================
*/

router.get("/:anime", async (req, res) => {
    const { anime } = req.params;

    try {

        const results = await ReviewModel.findAll({
            where: {
                anime: anime
            }
        });
        res.status(200).json(results);
    } catch (e) {

        res.status(500).json({
            error: e
        });
    };
});


/*
===================
   Review Edit
===================
*/

router.put("/edit/:entryId", validateSession, async (req, res) => {
    const {rating, content} = req.body;
    const reviewId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: reviewId,
            userId: userId
        }
    };

    const updatedReview = {
        rating: rating,
        content: content
    };

    try {

        const update = await ReviewModel.update(updatedReview, query);
        res.status(200).json({
            message: "review succesfully updated",
            update
        });
    } catch (e) {
        
        res.status(500).json({
            error: e
        });
    };
});


/*
====================
   Review Delete
====================
*/

router.delete("/delete/:id", validateSession, async (req, res) => {
    const userId = req.user.id
    let query;

    if (req.user.role == 'Admin') {
      query = { 
        where : { 
          id: req.params.id 
        } 
      };
    
    } else {
      query = { 
        where: { 
          id: req.params.id, 
          userId: userId 
        } 
      };
    };

    try {
        
        const deletedReview = ReviewModel.destroy(query)
            if (deletedReview === 0) {
                res.status(200).json({
                    message: "Review Removed",
                    deletedReview,
                });
            } else {
                res.status(200).json({
                    message: "no entry found"
                });
            }
    
    } catch (e) {
        
        res.status(500).json({
            message: 'Failed to delete Review',
            error: e
        });
    };
});

module.exports = router;