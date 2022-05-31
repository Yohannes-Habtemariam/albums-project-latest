import express from "express";
import cors from "cors";
import { Low, JSONFile } from "lowdb";
import morgan from "morgan";
import mongoose from "mongoose";

import globalErrorHandler from "./middleware/globalErrorHandler.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(cors());
app.use(express.json());

// * Task 1, Step 2
mongoose.connect("mongodb://localhost:27017/albums-project");

// Callbacks for mongoose - one for if the db connection opens successfully, another for if there's an error
mongoose.connection.on("open", () => console.log("Database connection established"));
mongoose.connection.on("error", () => console.error);

const adapter = new JSONFile("./data/db.json");
export const db = new Low(adapter);


// Use morgan to make a small log every time a request is received
app.use(morgan("tiny"));

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);

app.use(globalErrorHandler);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server has started on port ${process.env.port || 3001}!`);
})