import express from "express";

import { getHome, postHome, 
    getJoin, postJoin, 
    getLogin, postLogin,
    getEnrollPatient, postEnrollPatient,
    editPatient, deletePatient} from "../controller/user"

const rootRouter = express.Router();

rootRouter.route("/").get(getHome).post(postHome);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/enroll").get(getEnrollPatient).post(postEnrollPatient);
// rootRouter.post("/edit/:id", editPatient);
// rootRouter.post("/delete/:id", deletePatient);


export default rootRouter;