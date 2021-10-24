const { DataTypes } = require("sequelize");
const db = require("../db");

const Review = db.define("reviews", {
    anime: {
        type: DataTypes.JSON,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
});

module.exports = Review;