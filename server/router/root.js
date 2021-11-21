import express from "express";

import { getHome, postHome, getJoin, postJoin, getLogin, postLogin } from "../controller/user"

const rootRouter = express.Router();

rootRouter.route("/").get(getHome).post(postHome);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);


export default rootRouter;