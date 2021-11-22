import express from "express";

import { getHome, postHome, 
    getJoin, postJoin, 
    getLogin, postLogin,
    getEnrollPatient, postEnrollPatient,
    getEditPatient, postEditPatient,
    deletePatient} from "../controller/user"

const rootRouter = express.Router();

rootRouter.route("/").get(getHome).post(postHome);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/enroll").get(getEnrollPatient).post(postEnrollPatient);
rootRouter.route("/edit/:id").get(getEditPatient).post(postEditPatient);
rootRouter.post("/delete/:id", deletePatient);


export default rootRouter;