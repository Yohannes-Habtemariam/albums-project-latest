import express from "express";
import { getUserData, postAlbum, deleteAlbums, deleteSingleAlbum, deleteUser } from "../controllers/usersController.js";

const router = express.Router();

router.get("/:id", getUserData);    

router.post("/:id/albums", postAlbum);  

router.delete("/:id/albums", deleteAlbums);

router.delete("/:id/albums/:albumId", deleteSingleAlbum);

router.delete("/:id", deleteUser)

export default router;