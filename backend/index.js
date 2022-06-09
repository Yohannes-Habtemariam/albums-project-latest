import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

import globalErrorHandler from "./middleware/globalErrorHandler.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// * Task 1, Step 2
//mongoose.connect("mongodb://localhost:27017/albums-project"); // This is local database
//mongoose.connect("mongodb+srv://Yohannes:Haftey152352500@cluster0.uvleeqn.mongodb.net/albums-project?retryWrites=true&w=majority");
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.uvleeqn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);

// Callbacks for mongoose - one for if the db connection opens successfully, another for if there's an error
mongoose.connection.on("open", () => console.log("Database connection established"));
mongoose.connection.on("error", () => console.error);


// Use morgan to make a small log every time a request is received
app.use(morgan("tiny"));

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);

app.use(globalErrorHandler);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server has started on port ${process.env.port || 3001}!`);
})