const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
    {
        dishName: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            enum: ["Starter", "Main", "Dessert"],
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        availability: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);