import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASS, DB_HOST } = process.env;

const dbUri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/adoptme?retryWrites=true&w=majority`;


mongoose.set('strictQuery', true);
mongoose.connect(dbUri)
    .then(() => console.log("Nos conectamos a la BD correctamente"))
    .catch((error) => console.log("Tenemos un error de conexión en la BD", error));