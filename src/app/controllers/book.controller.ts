import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';

export const bookRoutes = express.Router()


//get all Book
bookRoutes.get('/', async(req:Request, res: Response)=>{
    const data= await Book.find()

    res.status(201).json({
        success:true,
        message: "Books retrieved successfully",
        data
    })
})

//Create a book 
bookRoutes.post('/create-book', async(req:Request, res: Response)=>{
    const book= req.body;
    const data = await Book.create(book)

    res.status(201).json({
        success:true,
        message:"Book created successfully",
        data
    })
})
// Get single book
bookRoutes.get('/:bookId', async(req:Request, res: Response)=>{
    const bookId =req.params.bookId;
    const data= await Book.findById(bookId)

    res.status(201).json({
        success:true,
        message: "Book retrieved successfully",
        data
    })
})
// update the book
bookRoutes.put('/:bookId', async(req:Request, res: Response)=>{
    const bookId =req.params.bookId;
    const book = req.body;
    const data= await Book.findByIdAndUpdate(bookId, book, {new: true})

    res.status(201).json({
        success:true,
        message:  "Book updated successfully",
        data
    })
})
// delete Book
bookRoutes.delete('/:bookId', async(req:Request, res: Response)=>{
   const bookId= req.params.bookId;
   const data= await Book.findByIdAndDelete(bookId, {new:true})
    res.status(201).json({
        success:true,
        message:"Book deleted successfully",
        data
    })
})