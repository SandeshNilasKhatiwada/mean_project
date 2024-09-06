import express, { Request, Response } from "express";  // Import Request and Response types
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import {v2 as cloudinary} from "cloudinary";

import MyUserRoutes from "./routes/MyUserRoutes"
import MyResturantRoutes from "./routes/MyResturantRoutes"

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string).then(()=>{
    console.log("Connected to the database")
})


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();

app.use(express.json());
app.use(cors());

app.get("/health",async(req: Request, res: Response)=>{
    res.send({message:"health OK !"})
})

app.use("/api/my/user", MyUserRoutes)
app.use("/api/my/resturant", MyResturantRoutes)

app.listen(7000, () => {
    console.log("server started on port 7000");
});
