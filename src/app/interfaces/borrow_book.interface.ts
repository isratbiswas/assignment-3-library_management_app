import { Date, ObjectId } from "mongoose"

export interface IBorrowBook{
    book: ObjectId
    quantity: number,
    dueDate: Date
}