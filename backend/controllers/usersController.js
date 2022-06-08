import User from "../models/user.js";
import createError from "http-errors";

// ==============================================
// GET the logged in user's data
// ==============================================

export const getUserData = async (req, res, next) => {
  // Take the :id parameter from the request path ("/users/:id/albums")
  const userId = req.params.id;

  let foundUser;
  try {
    foundUser = await User.findById(userId);
    //foundUser = await User.find({"users_id": userId})
  } catch {
    // const error = new Error("Could not query database. Please try again!");
    // error.statusCode = 500;
    // return next(error);
    //return next(createError(500, "Could not query database. Please try again!"));
    return next(
      new createError[500]("Could not query database `500`. Please try again!")
    );
  }

  // If a user was found with the same id as the :id parameter...
  if (foundUser) {
    const userData = {
      firstName: foundUser.firstName,
      albums: foundUser.albums,
    };

    res.json(userData);

    // If no user was found with the same id as the :id parameter...
    // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware
  } else {
    return next(createError[404]("User could not be found"));
  }
};

// =======================================================
// POST a new album to the logged in user's "albums" list
// =======================================================

export const postAlbum = async (req, res, next) => {
  const userId = req.params.id;
  const newAlbum = req.body; // newAlbum from the frontend

  let foundUser;
  try {
    foundUser = await User.findById(userId); // Find the logged-in user
  } catch {
    return next(
      createError[500]("Query could not be completed. Please try again!")
    );
  }

  // Check to see if the user already has the new album in their "albums" array
  const foundAlbum = foundUser.albums.find((album) => {
    return (
      album.band.toLowerCase() === newAlbum.band.toLowerCase() &&
      album.albumTitle.toLowerCase() === newAlbum.albumTitle.toLowerCase() &&
      album.albumYear == newAlbum.albumYear // from the frontend, the data is "String", but from the database, it is "Number"
    );
  });

  if (!foundAlbum) {
    let updatedUserAlbum;
    try {
      updatedUserAlbum = await User.findByIdAndUpdate(
        userId,
        { $push: { albums: newAlbum } },
        { new: true, runValidators: true }
      );
    } catch {
      return next(createError[500]("Could not be posted. Please try again!"));
    }
    res.status(201).json(updatedUserAlbum.albums);
  } else {
    next(new createError[409]("The album already exists in your collection!"));
  }
};

// ==========================================================
// DELETE all albums from the logged in user's "albums" list
// ==========================================================

export const deleteAlbums = async (req, res, next) => {
  const userId = req.params.id;

  let foundUser;
  try {
    foundUser = await User.findByIdAndUpdate(userId, {albums: []}, {new: true, runValidators: true});
  } catch {
    return next(createError[500]("User could not be updated!"));
  }

    res.json(foundUser.albums);
  
};

export const deleteSingleAlbum = async (req, res, next) => {
  const userId = req.params.id;
  const albumId = req.params.albumId;

  let updateAlbum;
  try{
    updateAlbum = await User.findByIdAndUpdate(userId, {$pull: {albums: {_id: albumId}}}, {new: true, runValidators: true})
  } catch{
    return next(createError.InternalServerError("The album could not be deleted!"))
  }
  res.json(updateAlbum.albums)

}
