import express from "express";

import { handleHome, getJoin, postJoin, getLogin, postLogin } from "../controller/user"

const rootRouter = express.Router();

rootRouter.get("/", handleHome);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);


export default rootRouter;