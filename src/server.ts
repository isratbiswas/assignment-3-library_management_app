import {Server} from "http";
import app from "./app";
import mongoose from "mongoose";

let server : Server;
const PORT = 5000;

async function libraryManagment(){
    await mongoose.connect(  "mongodb+srv://israt:58.%40P%40wnP9uchc-@cluster0.i6b4s.mongodb.net/library_App");
    console.log('connect to mongodb')
    try{
      server = app.listen(PORT, ()=>{
       console.log(`App listening on ${PORT}`)
      })  
    }
    catch(error){
        console.error(error)
    }

}
libraryManagment();