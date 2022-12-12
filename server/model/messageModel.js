import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        message: {
            text: {
                type: String,
                require: true,
            },
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

export const MessageModel = mongoose.model("Message", messageSchema);
