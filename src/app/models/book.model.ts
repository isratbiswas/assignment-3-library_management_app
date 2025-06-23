import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";


const bookSchema = new Schema<IBook>({
     title: {
        type: String,
        required: true,
        trim: true
     },
     author: {
        type: String,
        required: true,
        trim: true
     },
     genre: {
        type: String,
        uppercase: true,
        trim: true,
        enum: [ "FANTASY",'FICTION' , "NON_FICTION" , "SCIENCE" , "HISTORY" , "BIOGRAPHY" ],
        required: true
     },
     isbn:{
        type: String,
        required: true,
        unique: true

     },
     description:{
        type:String,

     }
     ,
     copies: {
        type: Number,
        min: [0, "Copies must be a positive number"],
        validate:{
        validator: Number.isInteger,
        message: "{VALUE} must be a positive number"
        }

     },
     available: {
        type: Boolean,
        default: true
     }

},
{versionKey: false,
    timestamps:true
}
)

// static method

 bookSchema.statics.borrow_book= async function(bookId, quantity){
  const book = await this.findById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }

  if (book.copies < quantity) {
    throw new Error('Not enough copies available');
  }

  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();
  return book;
};
 

export const Book = model<IBook>("Book", bookSchema)