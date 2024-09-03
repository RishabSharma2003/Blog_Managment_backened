import express from 'express';
import dotenv from 'dotenv'
import connection from './db/db.js';
import router from './routes/route.js';
import cors from 'cors';

const app=express();
dotenv.config()

// Increase the limit for JSON and URL-encoded body data
app.use(express.json({ limit: '50mb' })); // Increase limit if needed

app.use(express.json());
app.use(cors())
app.use('/',router)

//only for prduction
if(process.env.NODE_ENV==='production'){
    app.use(express.static("client/build"))
}

const PORT=8000||process.env.PORT;
app.listen(PORT,()=>{console.log(`server is running on ${PORT}`)})

const URL=process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5s5n5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


//establishing database connection
connection(URL)