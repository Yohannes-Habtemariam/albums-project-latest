import User from "../models/user.js";
import createError from "http-errors";

export const registerPost = async (req, res, next) => {
    const { username, password, firstName, lastName, emailAddress } = req.body;
  
    let foundUsername;
    try {
        foundUsername = await User.findOne({ username: username });
    } catch {
        return next(new createError.InternalServerError("Could not query database. Please try again!"))
    }

    // If there is no user in the db with the username received from the frontend
    if (!foundUsername) {
        // Create a new user based on data received from req.body
        const newUser = new User({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            albums: []
        });
    
        try {
            await newUser.save();   // We could get a validation error here if the schema is not fulfilled
        } catch {
            // const err = new Error("User could not be created. Please try again");
            // err.statusCode = 500;
            // return next(err);
            return next(new createError.InternalServerError("User could not be created. Please try again"))
        }
        
        res.status(201).json({id: newUser._id});
    
    } else {
        next(createError[409]("Sorry, this username has been taken. Please choose another"))
    }    
}