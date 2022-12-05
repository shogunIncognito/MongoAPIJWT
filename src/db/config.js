import { config } from "dotenv";
config()

export const DB_URL = process.env.DB_URL;
export const SECRET = process.env.SECRET;
export const PORT = process.env.PORT || 3000;