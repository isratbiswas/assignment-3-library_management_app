import mongoose, { model, Schema } from "mongoose";
import { IBorrowBook } from "../interfaces/borrow_book.interface";
import { Book } from "./book.model";


const borrowBookSchema= new Schema<IBorrowBook>({
    book: {
     type: mongoose.Schema.Types.ObjectId, ref:Book, required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0 
    },
    dueDate:{
        type:Date,
        required: true
    }

})

export const BorrowBook= model<IBorrowBook>("BorrowBook", borrowBookSchema)