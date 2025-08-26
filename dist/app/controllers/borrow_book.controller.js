"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_book_model_1 = require("../models/borrow_book.model");
exports.borrowBookRoutes = express_1.default.Router();
exports.borrowBookRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield borrow_book_model_1.BorrowBook.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" }
            }
        },
        {
            $lookup: {
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
            $project: {
                _id: 0,
                book: {
                    title: "$bookInfo.title",
                    isbn: "$bookInfo.isbn"
                },
                totalQuantity: 1,
            }
        }
    ]);
    res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data
    });
}));
exports.borrowBookRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowBook = req.body;
        //static method
        const data = yield borrow_book_model_1.BorrowBook.create(borrowBook);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            status: false,
            message: "This book is not available for this time.Please come two weeks leter..",
            error: error
        });
    }
}));
