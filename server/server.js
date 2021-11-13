import express from "express";
import morgan from "morgan";
import rootRouter from "./router/user";
import mariaRouter from "./router/maria";

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
app.use("/maria", mariaRouter);

export default app;