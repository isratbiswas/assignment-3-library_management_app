 import express ,{Application, Request, Response} from "express"
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowBookRoutes } from "./app/controllers/borrow_book.controller";

const app : Application =express();
app.use(express.json())
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowBookRoutes);
app.get('/', (req: Request, res: Response)=>{
    res.send("Welcome to our library ")
})

export default app;

