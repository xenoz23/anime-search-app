import express from "express";
import  path from "path";
import animeRoutes from "./routes/animeRoutes.js";

const app = express();
const port = 3000;

app.set('view engine', "ejs");
app.set("views", path.join(process.cwd(),"views"));

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use("/", animeRoutes);

app.listen(port, () =>{
    console.log(`Server is Running on Port: ${port}`);
});