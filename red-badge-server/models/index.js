const UserModel = require("./user");
const ReviewModel = require("./review");
const CommentModel = require("./comment");

UserModel.hasMany(ReviewModel);
UserModel.hasMany(CommentModel);

ReviewModel.belongsTo(UserModel);
ReviewModel.hasMany(CommentModel);

CommentModel.belongsTo(ReviewModel);

module.exports = {
  UserModel,
  ReviewModel,
  CommentModel
};