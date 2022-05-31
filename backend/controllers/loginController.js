import { db } from "../index.js";
import User from "../models/user.js";

export const loginPost = async (req, res, next) => {
  // Take the username and password the user tried to log in with
  const { username, password } = req.body;

  // Search inside the current list of users
  // Do any users have the SAME username AND password?
  let found;
  try {
    found = await User.findOne({
      $and: [{ username: { $eq: username } }, { password: { $eq: password } }]
    });
  } catch {
    const err = new Error("Username or password incorrect");
    err.statusCode = 500;
    return next(err);
  }

  // If we found a user in our db with the same login details as we received from the frontend...
  // Send that user's id back the frontend in the response for further processing
  if (found) {
    const userId = {
      id: found.id,
    };

    res.json(userId);
    // If we found no user in our db with the same login details as we received from the frontend
    // (E.g. the person logging in made a mistake with their username/password/both!)
    // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware
  } else {
    const err = new Error("You could not be logged in. Please try again"); // Message
    err.statusCode = 401; // "Unauthorized"
    next(err);
  }
};
