import { Date, ObjectId, Types } from "mongoose"

export interface IBorrowBook{
    book: Types.ObjectId,
    quantity: number ,
    dueDate: Date,
    versionKey: boolean,
    timestamps: boolean
}
 console.log(Types.ObjectId)