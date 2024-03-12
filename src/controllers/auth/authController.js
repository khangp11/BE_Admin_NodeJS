const userController = require('../user/userController');

const bcrypt = require("bcrypt");
require('dotenv').config();
let refreshTokens = [];
const jwt = require("jsonwebtoken");
const currentDate = new Date();


const authController = {
    registerUser: async (req, res) => {
        try {
            const fullname = req.body.fullname;
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            const username = req.body.username;
            const gender = req.body.gender;
            const email = req.body.email;
            const user = await userController.FindByUsername(username);
            if (user == username) {
                console.log("user name đã tồn tại");
                return res.status(400).json("user name đã tồn tại!");
            }
            const newUserData = {
                fullname: fullname,
                username: username,
                gender: gender,
                email: email,
                password: hashed,
                role_id: 1,
                status: 1,
                valid: 0,
                confirmed: 0,
                created_at: currentDate,
                updated_at: currentDate,
            };
            const results = await userController.Create(newUserData);
            return res.json(results);
        } catch (error) {
            console.error("Error in registerUser function of authController :", error);
            res.json({ error: 1, msg: error });
        }
    },
    loginUser: async (req, res) => {
        try {
            const username = req.body.username;
            const user = await userController.FindByUsername(username);
            if (!user) {
                return res.status(404).json("Không có tên người dùng");
            }
            const password = req.body.password;
            const validPassword = await bcrypt.compare(
                password,
                user.data.password
            );
            if (!validPassword) {
                return res.status(404).json("Mật khẩu không hợp lệ");
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                const { password, ...others } = user;
                res.status(200).json({ ...others, accessToken, refreshToken });
            }
        } catch (error) {
            console.error("Error in login function of authController :", error);
            res.status(500).json(error);
        }
    },
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.data.id,
                role_id: user.data.role_id,
                username: user.data.username,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "10s" }
        );
    },
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.data.id,
                role_id: user.data.role_id,
                username: user.data.username,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "100d" }
        );
    },
    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        });
    },
    logOut: async (req, res) => {
        refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully!");
    },
}
module.exports = authController;