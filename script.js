import express from "express"
import dotenv from "dotenv"
import fs from "fs"
import logger from "./middleware/logger.js"
import registerRouter from "./routes/register.js"
import authRouter from "./routes/auth.js"
import users from "./database/db.json" with { type: "json" }

dotenv.config()

const app = express(),
    PORT = process.env.PORT || 3000

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use("/register", registerRouter)

app.use("/auth", authRouter)

app.get("/api/users", (req, res) =>{

    const safeUsers = users.map(user => ({ userName: user.userName }))

    logger.emit("log", `Users list accessed — ${safeUsers.length} users`)

    logger.emit("grade", "PART 4 ✅ Users returned without passwords")

    res.status(200).json(safeUsers)

})

app.listen(PORT, () =>{

    console.log(`Server is running on port ${PORT}`)

    logger.emit("grade", "PART 1 ✅ Server started successfully")

})