const { Router } = require("express");
const validateSession = require("../middleware/validate-session");
const { CommentModel } = require("../models");

const router = Router();


/*
======================
   Create Comment
======================
*/

router.post("/create", validateSession, async (req, res) => {
    
    const {content, reviewId} = req.body;

    try {

        await CommentModel.create({
            content: content,
            reviewId: reviewId,
            owner: req.user.username
        })
        .then(
            comment => {
                res.status(200).json({
                    comment: comment,
                    message: "Comment Created"
                });
            }
        )
    } catch (e) {
        res.status(500).json({
            error: `Failed to create comment: ${e}`
        });
    };
});


/*
===========================
   Get comments by Review
===========================
*/

router.get("/:reviewId", async (req, res) => {
    const { reviewId } = req.params;

    try {

        const results = await CommentModel.findAll({
            where: {
                reviewId: reviewId
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
======================
   Edit Comment
======================
*/

router.put("/edit/:entryId", validateSession, async (req, res) => {
    
    const { content } = req.body;
    const commentId = req.params.entryId;
    const owner = req.user.username;

    const query = {
        where: {
            owner: owner,
            id: commentId
        }
    };

    const updatedComment = {
        content: content
    };

    try {

        const update = await CommentModel.update(updatedComment, query);
        res.status(200).json({
            message: "Comment successfully updated",
            update
        });
    } catch (e) {

        res.status(500).json({
            error: e
        });
    };
});


/*
======================
   Delete Comment
======================
*/

router.delete("/delete/:id", validateSession, async (req, res) => {
    const userId = req.user.id
    let query;

    if (req.user.role == 'Admin') {
        query = { where: { id: req.params.id } };
    } else {
        query = { where: { id: req.params.id, userId: userId } };
    }
    
    try {
        const deletedComment = await CommentModel.destroy(query)
        if (deletedComment !== 0) {
            res.status(200).json({
                message: "Comment Removed",
                deletedComment,
            });
        } else {
            res.status(200).json({
                message: "no entry found" 
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "Failed to remove Comment",
            error: e
        });
    };
});

module.exports = router;