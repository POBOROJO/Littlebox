import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import databaseConnection from './configs/database.js';
import registerRoute from './routes/registerRoute.js';
import postRoute from './routes/postRoute.js';
import loginRoute from './routes/loginRoute.js';

const app = express();

dotenv.config({
    path:".env"
})

databaseConnection();

const PORT = process.env.PORT;

app.use(bodyParser.json()); 
app.use(cors());

app.use("/", registerRoute); // register
app.use("/", loginRoute); // login
app.use("/", postRoute); // posts

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
})