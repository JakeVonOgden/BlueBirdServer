const { Router } = require("express");
const validateSession = require("../middleware/validate-session");
const { CommentModel } = require("../models");

const router = Router();

// Create Comment

router.post("/create", validateSession, async (req, res) => {
    
    const {content, reviewId} = req.body;

    try {

        await CommentModel.create({
            content: content,
            reviewId: reviewId,
            userId: req.user.id
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

// Get comments by review

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

// Edit comment

router.put("/edit/:entryId", validateSession, async (req, res) => {
    
    const { content } = req.body;
    const reviewId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            userId: userId,
            reviewId: reviewId
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

// Delete comment

router.delete("/delete/:id", validateSession, async (req, res) => {

    try {

        const deletedComment = await CommentModel.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({
            message: "Comment Removed",
            deletedComment,
        });
    } catch (e) {

        res.status(500).json({
            message: "Failed to remove Comment",
            error: e
        });
    };
});

module.exports = router;