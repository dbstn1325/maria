import express from "express";
import http from "http";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import morgan from "morgan";
import rootRouter from "./router/root";
import userRouter from "./router/user";
import "dotenv/config";
import { localsMiddleware } from "./middleware";






const app = express();
const server = http.createServer(app);
server.listen(3001, () => { console.log("hi")});


//middleware
app.set("view engine", "pug");
app.set("views", process.cwd() + "/client/views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));



//session
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'user_database'
    })
}));




//route
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/user", userRouter);

