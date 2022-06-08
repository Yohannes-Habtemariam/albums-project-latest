import User from "../models/user.js";
import createError from "http-errors"

export const loginPost = async (req, res, next) => {
  const { username, password } = req.body;
  // Do any users have the SAME username AND password?
  let found;
  try {
    found = await User.findOne({
      $and: [{ username: { $eq: username } }, { password: { $eq: password } }]
    });
  } catch {
    return next(new createError.InternalServerError("There is internal server error"))
  }

  // If you found a user with the same login details as we received from the frontend, and then send that user's id back the frontend in the response for further processing
  if (found) {
    const userId = {
      id: found._id,
    };
    res.json(userId);
    
  } else {
    // const err = new Error("You could not be logged in. Please register first!"); // Message
    // err.statusCode = 401; // "Unauthorized"
    // next(err);
    return next(new createError.Unauthorized("You could not be logged in. Please register first!"))
  }
};
