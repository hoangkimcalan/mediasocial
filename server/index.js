import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messagesRoute.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(
            process.env.PORT,
            console.log(`Server running on port ${process.env.PORT}`)
        );
        console.log("DB Connetion Successfull");
    })
    .catch((err) => {
        console.log(err.message);
    });
