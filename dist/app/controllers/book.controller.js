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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
//get all Book
exports.bookRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter } = req.query;
        const queryObj = {};
        if (filter) {
            // filter by genre
            queryObj.genre = filter;
        }
        const books = yield book_model_1.Book.find(queryObj).sort({ createdAt: -1 }).limit(5);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
}));
//Create a book 
exports.bookRoutes.post('/create-book', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        //instance method
        const data = new book_model_1.Book(book);
        yield data.save();
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Validation failed",
            error: error
        });
    }
}));
// Get single book
exports.bookRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.params.bookId;
        const data = yield book_model_1.Book.findById(book);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Validation failed",
            error: error
        });
    }
}));
// update the book
exports.bookRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = req.body;
        const data = yield book_model_1.Book.findByIdAndUpdate(bookId, book, { new: true });
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Validation failed",
            error: error
        });
    }
}));
// delete Book
exports.bookRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        if (!bookId) {
            console.log(bookId);
            res.status(201).json({
                message: 'This book is not exist.'
            });
        }
        const data = yield book_model_1.Book.findByIdAndDelete(bookId, { new: true });
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Validation failed",
            error: error
        });
    }
}));
