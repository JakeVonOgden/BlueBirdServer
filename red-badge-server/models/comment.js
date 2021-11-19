const { DataTypes } = require("sequelize");
const db = require("../db");

const Comment = db.define("comments", {
    content: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Score: {
        type: DataTypes.INTEGER
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Comment;