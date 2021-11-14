import express from "express";
import { logout, see } from "../controller/user";

const userRouter = express.Router();


userRouter.route("/logout", logout);
userRouter.get("/:id", see);

export default userRouter;