import express from "express"
import deleteController from "../controllers/deleteController.js"

const deleteRoute = express.Router()

deleteRoute.delete("/:userName", deleteController)

export default deleteRoute