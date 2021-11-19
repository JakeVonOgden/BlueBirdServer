const { DataTypes } = require("sequelize");
const db = require("../db");

const Review = db.define("reviews", {
    anime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
    },
    owner: {
        type: DataTypes.STRING,
    }
});

module.exports = Review;