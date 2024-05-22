import express, {Router} from "express";
import { homePage,dynamicTable,kukuKube,ticTacToe } from "../controllers/staticController";

import { paginateOrderBy,orderBy,delimiterSearch,delimiterSearching } from "../controllers/paginationController";
import { jobIndex } from "../controllers/jobAppController";

const routes:Router = express.Router();

routes.get("/",homePage)

routes.get('/dynamicTable',dynamicTable)

routes.get('/kukukube',kukuKube)

routes.get('/ticTacToe', ticTacToe)

routes.get('/paginate/orderBy',paginateOrderBy)

routes.get('/orderBy/:page/:col/:order', orderBy)

routes.get('/paginate/delimiter',delimiterSearch)

routes.post('/delimiter',delimiterSearching)

routes.get('/jobIndex',jobIndex)

routes.get("/logout",(req,res) => {

  res.clearCookie("token");
  res.redirect("/");
})

export default routes;