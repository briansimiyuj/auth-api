import express from "express"
import dotenv from "dotenv"
import fs from "fs"
import logger from "./middleware/logger.js"

dotenv.config()

const app = express(),
    PORT = process.env.PORT || 3000

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () =>{

    console.log(`Server is running on port ${PORT}`)

    logger.emit("grade", "PART 1 ✅ Server started successfully")

})