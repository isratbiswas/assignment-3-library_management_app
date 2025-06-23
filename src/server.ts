import {Server} from "http";
import app from "./app";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
let server : Server;

const port = process.env.PORT;

async function libraryManagment(){
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i6b4s.mongodb.net/library_App`);
    console.log('connect to mongodb')
    try{
      server = app.listen(port, ()=>{
       console.log(`App listening on ${port}`)
      })  
     
    }
    catch(error){
        console.error(error)
    }

}
libraryManagment();