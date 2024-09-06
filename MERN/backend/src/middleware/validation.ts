import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handelValidationErrors = async (req: Request, res: Response, next: NextFunction) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next()

}
export const validateMyUserRequest= [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be string"),
    body("city").isString().notEmpty().withMessage("city must be string"),
    body("country").isString().notEmpty().withMessage("country must be string"),
    handelValidationErrors,
]

export const validateMyResturantRequest = [
    body("resturantName").notEmpty().withMessage("Resturant name is require"),
    body("city").notEmpty().withMessage("Resturant name is require"),
    body("deliveryPrice").isFloat({min: 0}). withMessage("Delivery price must be positive number"),
    body("estimatedDeliveryTime").isInt({min: 0}). withMessage("Estimated delivery time must be positive integer"),
    body("cuisines").isArray().withMessage("Cuisines must be an array").not().isEmpty().withMessage("Cuisines array cannot be empty"),
    body("menuItems").isArray().withMessage("Menu item must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item must be an array"),
    body("menuItems.*.price").isFloat({min:0}).withMessage("Menu item is required and must be positive number"),
    handelValidationErrors
]