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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowBook = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
const borrowBookSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: book_model_1.Book,
        required: [true, "Book references is required"]
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required'],
        min: [1, 'Quantity must be at least {VALUE}'],
        validate: {
            validator: Number.isInteger,
            message: "{value} is not an interger value"
        }
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
        validate: {
            validator: function () {
                return new Date();
            },
            message: "Due Date must be future"
        }
    }
}, { versionKey: false,
    timestamps: true
});
// pre middleware
borrowBookSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.Book.findById(this.book);
        if (book) {
            book.copies -= this.quantity;
            yield book.save();
        }
        next();
    });
});
exports.BorrowBook = (0, mongoose_1.model)("BorrowBook", borrowBookSchema);
