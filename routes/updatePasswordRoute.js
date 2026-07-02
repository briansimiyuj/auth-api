import express from "express"
import updatePasswordController from "../controllers/updatePasswordController.js"

const updatePasswordRoute = express.Router()

updatePasswordRoute.put("/:update", updatePasswordController)

export default updatePasswordRoute