import express,{ Express} from "express";
import { config } from "dotenv";
import  routes  from "./routes/routes";
import cookieParser from "cookie-parser";
config();

const app : Express = express();
const port: string = process.env.PORT || "5000";


app.set('view engine','ejs');
app.set('views',[__dirname+'/views/',__dirname+'/views/javascriptTasks',__dirname+'/views/paginationTasks',__dirname+'/views/jobApplicationTasks']);

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());


app.use(routes);

app.listen(port, ()=> {
  console.log(`Server is running on:- http://localhost:${port}/`);
})