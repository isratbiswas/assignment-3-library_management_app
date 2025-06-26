import express, { Request, Response } from "express";
import { BorrowBook } from "../models/borrow_book.model";


export const borrowBookRoutes= express.Router();

borrowBookRoutes.get('/', async(req: Request, res:Response)=>{
     
const  data = await BorrowBook.aggregate([
  {
    $group:{
       _id: "$book",
       totalQuantity:{ $sum: "$quantity"}
    }
  },
  {
    $lookup:{
      from: "books",
      localField: '_id',
      foreignField: "_id",
      as: "bookInfo"
    }
  },
  {
    $unwind: "$bookInfo"
  },
  {
    $project:{
      _id:0,
        book:{
          title: "$bookInfo.title",
          isbn: "$bookInfo.isbn"
        },
        totalQuantity: 1,
    }
  }
])


res.status(200).json({
     success: true,
     message: "Borrowed books summary retrieved successfully",
     data

})

})

borrowBookRoutes.post('/', async(req: Request, res:Response)=>{
try{
      const borrowBook=req.body;
    //static method
     const data = await BorrowBook.create(borrowBook)
      res.status(201).json({
        success: true,
        message:  "Book borrowed successfully",
        data
      })
}
catch(error){
  res.status(400).json({
      status:false,
      message: "This book is not available for this time.Please come two weeks leter..",
      error: error
  })
}
})
