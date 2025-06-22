import express, { Request, Response } from "express";
import { BorrowBook } from "../models/borrow_book.model";


export const borrowBookRoutes= express.Router();

borrowBookRoutes.get('/', async(req: Request, res:Response)=>{
      const borrowBook = await BorrowBook.find()
      res.status(201).json({
        success: true,
        message: ""
      })
})
borrowBookRoutes.post('/', async(req: Request, res:Response)=>{
    const borrowBook=req.body;
    const createBorrowBook = await BorrowBook.create(borrowBook)
      res.status(201).json({
        success: true,
        message: ""
      })
})
