import { PostModel } from "../model/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // check username
        const usernameCheck = await PostModel.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "Username already used", status: false });
        }

        //check email
        const emailCheck = await PostModel.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "Email already existed", status: false });
        }

        const saltRounds = 10;
        const myPlaintextPassword = password;

        const hashedPassword = await bcrypt.hash(
            myPlaintextPassword,
            saltRounds
        );

        const user = await PostModel.create({
            email,
            username,
            password: hashedPassword,
        });

        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await PostModel.findOne({ username });
        if (!user) {
            return res.json({
                msg: "Incorrect username or password",
                status: false,
            });
        }
        const saltRounds = 10;
        const myPlaintextPassword = password;

        const isPasswordValid = await bcrypt.compare(
            myPlaintextPassword,
            user.password
        );

        if (!isPasswordValid) {
            return res.json({
                msg: "Incorrect username or password",
                status: false,
            });
        }

        delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
};

export const setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await PostModel.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        });

        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await PostModel.find({
            _id: { $ne: req.params.id },
        }).select(["email", "username", "avatarImage", "_id"]);

        console.log("user", users);
        return res.json(users);
    } catch (error) {
        next(error);
    }
};
