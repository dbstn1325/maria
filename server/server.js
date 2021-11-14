import express from "express";
import morgan from "morgan";
import rootRouter from "./router/root";
import mariaRouter from "./router/maria";
import userRouter from "./router/user";



const app = express();


//middleware
app.set("view engine", "pug");
app.set("views", process.cwd() + "/server/views");
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//session




//route
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/maria", mariaRouter);

export default app;