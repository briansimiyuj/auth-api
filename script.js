import express from "express"
import dotenv from "dotenv"
import fs from "fs"
import logger from "./middleware/logger.js"
import registerRouter from "./routes/register.js"

dotenv.config()

const app = express(),
    PORT = process.env.PORT || 3000

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use("/register", registerRouter)

app.listen(PORT, () =>{

    console.log(`Server is running on port ${PORT}`)

    logger.emit("grade", "PART 1 ✅ Server started successfully")

})