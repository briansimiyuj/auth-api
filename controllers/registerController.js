import bycrypt from "bcrypt"
import fsPromises from "fs/promises"
import { fileURLToPath } from "url"
import path, { join, dirname } from "path"
import logger from "../middleware/logger.js"

const __fileName = fileURLToPath(import.meta.url),
      __dirName = path.dirname(__fileName),
      dbPath = join(__dirName, "../database/db.json")

const userDB ={

    users: JSON.parse(await fsPromises.readFile(dbPath, "utf-8")),
    setUsers: function(data){ this.users = data }

}

const handleNewUser = async(req, res) =>{

    const { userName, password } = req.body

    if(!userName || !password){
        
        return res.status(400).json({ "message": "Username and password are required." })

    }

    const duplicate = userDB.users.find(user => user.userName === userName)

    if(duplicate){

        return res.status(409).json({ "message": "Username already exists." })

    }

    try{
    
        const hashedPassword = await bycrypt.hash(password, 10),
              newUser = { "userName": userName, "password": hashedPassword }

        userDB.users.push(newUser)

        await fsPromises.writeFile(dbPath, JSON.stringify(userDB.users))

        res.status(201).json({ "success": `New user ${userName} created!` })

        logger.emit("log", `New user registered: ${userName}`)

        logger.emit("grade", "PART 2 ✅ User registered with hashed password")

    
    }catch(e){
    
        res.status(500).json({ "message": e.message })
    
    }

}

export default handleNewUser