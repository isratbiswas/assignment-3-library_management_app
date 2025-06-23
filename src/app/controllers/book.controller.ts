import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';

export const bookRoutes = express.Router()


//get all Book
bookRoutes.get('/', async (req: Request, res: Response) => {
   try {
     const { filter } = req.query; 
     const queryObj: Record<string, any> = {};
    if (filter) {
      // filter by genre
      queryObj.genre = filter; 
    }

    const books = await Book.find(queryObj).sort({createdAt: -1}).limit(5); 
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error
  
    });
  }
});

//Create a book 
bookRoutes.post('/create-book', async(req:Request, res: Response)=>{
    try{
   const book= req.body;
    //instance method
    const data = new Book(book)
    await data.save()
    res.status(201).json({
        success:true,
        message:"Book created successfully",
        data
    })
    }catch(error){
      res.status(500).json({
          success:false,
          message:"Validation failed",
         error: error
      })

    }
})
// Get single book
bookRoutes.get('/:bookId', async(req:Request, res: Response)=>{
  try{
      const book= req.params.bookId;
    const data = await Book.findById(book)
    res.status(201).json({
        success:true,
        message: "Book retrieved successfully",
        data
    })
  } catch(error){
       res.status(500).json({
          success:false,
        message:"Validation failed",
       error: error
      })

  }
})
// update the book
bookRoutes.put('/:bookId', async(req:Request, res: Response)=>{
    try{
    const bookId =req.params.bookId;
    const book = req.body;
    const data= await Book.findByIdAndUpdate(bookId, book, {new: true})

    res.status(201).json({
        success:true,
        message:  "Book updated successfully",
        data
    })
    }
    catch(error){
       res.status(500).json({
          success:false,
          message:"Validation failed",
         error: error
      })

    }
})
// delete Book
bookRoutes.delete('/:bookId', async(req:Request, res: Response)=>{
  
   try {
     const bookId= req.params.bookId;
  
    if(!bookId){
   console.log(bookId)
        res.status(201).json({
           message: 'This book is not exist.'
        })
   }
     const data= await Book.findByIdAndDelete(bookId, {new:true})
      res.status(201).json({
        success:true,
        message:"Book deleted successfully",
        data
    })
     
   } catch(error){
           res.status(500).json({
           success:false,
           message:"Validation failed",
           error: error
      })

   }
   
   
})