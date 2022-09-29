import express from "express";
import cors from "cors";
import FileUpload from "express-fileupload";
import ProductRoutes from "./routes/ProductRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(ProductRoutes);


app.listen(5000, ()=> console.log('Server Up And Running...'));