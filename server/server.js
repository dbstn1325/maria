import express from "express";
import http from "http";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import morgan from "morgan";
import rootRouter from "./router/root";
import mariaRouter from "./router/maria";
import userRouter from "./router/user";
import "dotenv/config";
import { localsMiddleware } from "./middleware";





const app = express();
const server = http.createServer(app);
server.listen(3001, () => { console.log("hi")});

// http.createServer(function (req,res){
//     let date = new Date();
//     date.setDate(date.getDate() +7)
    
//     res.writeHead(200, {
//         'Content-Type': 'text/html',
//         'Set-Cookie': [
//             'myname = seongsoo; Expires = ' + date.toUTCString(), // myName에 유효기간설정
//             'mygoal = good developer'
//           ]
//         })
//         res.end('<h1>' + req.headers.cookie + '</h1>')
//       }).listen(3001, function () {
//         console.log('Server is Running at http://127.0.0.1:3001')
//       })

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

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'patient_db'
    })
}));



//route
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/maria", mariaRouter);
