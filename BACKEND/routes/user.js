const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User, Profile } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SEC } = require("../config");
const  { authMiddleware } = require("../middleware");


const SignupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

router.post("/signup", async (req, res) => {
    try {
        const { success } = SignupBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Incorrect inputs"
            });
        }

        const existingUser = await User.findOne({
            username: req.body.username
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Username already taken"
            });
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        const userId = user._id;
        
        //profile
        const profile = await Profile.create({
            userId: userId,
            followers: [],
            followings: [] 
        })
        const token = jwt.sign({
            userId
        }, JWT_SEC);

        res.json({
            message: "User created successfully",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred during signup",
            error: error.message
        });
    }
});

module.exports = router;