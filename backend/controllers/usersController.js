import { db } from "../index.js";
import { v4 as uuid } from "uuid";
import User from "../models/user.js";

// ==============================================
// GET the logged in user's data
// ==============================================

export const getUserData = async(req, res, next) => {
    // Take the :id parameter from the request path ("/users/:id/albums")
    const userId = req.params.id;

    let foundUser;
    try{
        foundUser = await User.findById(userId);
    }catch{
        const error = new Error("Could not query database. Please try again!");
        error.statusCode = 500;
        return next(error);
    }
    

    // If a user was found with the same id as the :id parameter...
    if (foundUser) {
        const userData = {
            firstName: foundUser.firstName,
            albums: foundUser.albums
        }

        res.json(userData);
    
    // If no user was found with the same id as the :id parameter...
    // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware
    } else {
        const err = new Error("User could not be found");
        err.statusCode = 404;
        next(err);
    }
}

// =======================================================
// POST a new album to the logged in user's "albums" list
// =======================================================

export const postAlbum = async (req, res, next) => {
    const { band, albumTitle, albumYear } = req.body;

    const newAlbum = {
        id: uuid(),
        band: band,
        albumTitle: albumTitle,
        albumYear: albumYear
    }

    // Take the user's id from the "id" parameter of their request URL
    const userId = req.params.id;

    // Find the index of the user inside the "users" array of the database file
    const indexOfUser = db.data.users.findIndex(user => user.id === userId);

    // Search in the user's array of albums to see if they already have the new album there
    const foundAlbum = db.data.users[indexOfUser].albums.find(album => {
        return album.band.toLowerCase() === band.toLowerCase() 
            && album.albumTitle.toLowerCase() === albumTitle.toLowerCase() 
            && album.albumYear === albumYear
    })

    // If the user does not already have the new album in their "albums" array...
    if (!foundAlbum) {
        db.data.users[indexOfUser].albums.push(newAlbum);

        await db.write();

        res.status(201).json(db.data.users[indexOfUser].albums);
    
    // If the new album is already in the user's "albums" array...
    // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware    
    } else {
        const err = new Error("The album already exists in your collection!");
        err.statusCode = 409;   // Conflict
        next(err);
    }
}

// ==========================================================
// DELETE all albums from the logged in user's "albums" list
// ==========================================================

export const deleteAlbums = async (req, res, next) => {
    const userId = req.params.id;

    const indexOfUser = db.data.users.findIndex(user => user.id === userId);

    // If the user exists in the db...
    if (indexOfUser > -1) {
        db.data.users[indexOfUser].albums = [];

        await db.write();
    
        res.json(db.data.users[indexOfUser].albums);
    
    // If the user does not exist in the db...
    // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware
    } else {
        const err = new Error("User could not be found");
        err.statusCode = 404;
        next(err);
    }
}