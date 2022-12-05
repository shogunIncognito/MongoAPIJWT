import mongoose from "mongoose";
import { DB_URL } from "./config.js";

mongoose.connect(DB_URL)
    .then((db) => console.log("Connected to MongoDB..."))
    .catch(err => console.error('Could not connect to MongoDB...'));

export const conn = mongoose.connection;