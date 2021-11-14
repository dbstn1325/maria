import express from "express";

import { getSearch, postSearch } from "../controller/maria";

const mariaRouter = express.Router();

mariaRouter.route("/search").get(getSearch).post(postSearch);

export default mariaRouter;