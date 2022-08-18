import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
//Routes

const app = express();
dotenv.config();

//Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
app.use(morgan('dev'));


// to serve images inside public folder
app.use(express.static('public'));
app.use('/images', express.static('images'));

mongoose
    .connect(process.env.MONGO_DB, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(() => 
        app.listen(process.env.PORT, () => 
            console.log(`Application listening to the port ${process.env.PORT}`)
        )
    )
    .catch((error) => console.log(error));

    //Uages of routes

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/posts', PostRoute);
app.use('/upload', UploadRoute);
