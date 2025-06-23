"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_book_controller_1 = require("./app/controllers/borrow_book.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/books', book_controller_1.bookRoutes);
app.use('/api/borrow', borrow_book_controller_1.borrowBookRoutes);
app.get('/', (req, res) => {
    res.send("Welcome to our library ");
});
exports.default = app;
