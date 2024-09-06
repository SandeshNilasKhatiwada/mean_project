import {Request, Response} from "express"
import Resturant from "../models/resturant";
import cloudinary from "cloudinary"
import mongoose from "mongoose";

const createMyResturant = async (req: Request, res: Response) => {

    try {
        const existingResturant = await Resturant.findOne({user: req.userId});
        if (existingResturant){
            return res.status(409).json({message:"User resturant already exists"})

        }
        const image = req.file as Express.Multer.File
        const base64Image = Buffer.from(image.buffer).toString("base64")
        const dataURI = `data:${image.mimetype};base64,${base64Image}`

        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)

        const resturant = new Resturant(req.body)
        resturant.imageUrl = uploadResponse.url
        resturant.user = new mongoose.Types.ObjectId(req.userId);
        resturant.lastUpdate = new Date()
        await resturant.save();

        res.status(201).send(resturant);


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

export default {
    createMyResturant
}