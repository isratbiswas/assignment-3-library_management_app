import  { model, Schema } from "mongoose";
import { IBorrowBook } from "../interfaces/borrow_book.interface";
import { Book } from "./book.model";


const borrowBookSchema= new Schema<IBorrowBook>({
    book: {
     type: Schema.Types.ObjectId,
      ref:Book, 
      required: [true, "Book references is required"]
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required'],
         min: [1, 'Quantity must be at least {VALUE}'],
        validate:{
          validator: Number.isInteger,
          message: "{value} is not an interger value"
        }
       
    },
    dueDate:{
        type:Date,
        required: [true, 'Due date is required'],
        validate:{
            validator: function(){
                return new Date()
            },
            message: "Due Date must be future"
        }
           
    }

},
{versionKey: false,
    timestamps:true
})

// pre middleware
  borrowBookSchema.pre("save", async function(next){
    const book = await Book.findById(this.book);
    if(book){
        book.copies -=this.quantity;
        await book.save();
    }
    next()
  })
export const BorrowBook= model<IBorrowBook>("BorrowBook", borrowBookSchema)