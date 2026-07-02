import fsPromises from "fs/promises"
import bcrypt from "bcrypt"
import { fileURLToPath } from "url"
import path, { join, dirname } from "path"
import users from "../database/db.json" with { type: "json" }
import logger from "../middleware/logger.js"

const __fileName = fileURLToPath(import.meta.url),
      __dirName = path.dirname(__fileName),
      dbPath = join(__dirName, "../database/db.json")

const userDB ={

    users: JSON.parse(await fsPromises.readFile(dbPath, "utf-8")),
    setUsers: function(data){ this.users = data }

}

const updatePasswordController = async(req, res) =>{

    const { userName, password } = req.body

    if(!userName){

        return res.status(400).json({ "message": "Username is required." })

    }

    if(!password){

        return res.status(400).json({ "message": "Password is required." })

    }

    const user = userDB.users.find(user => user.userName === userName)

    if(!user){

        return res.status(400).json({ "message": "User not found." })

    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword

    await fsPromises.writeFile(dbPath, JSON.stringify(userDB.users))

    logger.emit("log", `Password updated for user: ${userName}`)

    logger.emit("grade", "BONUS ✅ Password updated successfully")

    res.status(200).json({ "message": `Password updated for user ${userName}.` })

}

export default updatePasswordController