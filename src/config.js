import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "us-cdbr-iron-east-02.cleardb.net";
export const DB_USER = process.env.DB_USER || "b2fb43e6ad5b70";
export const DB_PASSWORD = process.env.DB_PASSWORD || "4642f088";
export const DB_DATABASE = process.env.DB_DATABASE || "heroku_8068a6b1f72cc7c";
export const DB_PORT = process.env.DB_PORT || 3306;
