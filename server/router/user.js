import express from "express";
import {logout, see, getEdit, postEdit} from "../controller/user";

const userRouter = express.Router();


userRouter.get("/logout", logout);
userRouter.route("/edit-profile").get(getEdit).post(postEdit);
// userRouter.get("/:id", see);

export default userRouter;