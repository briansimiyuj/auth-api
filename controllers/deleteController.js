import fsPromises from "fs/promises"
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

const deleteController = async(req, res) =>{

    const { userName } = req.params

    if(!userName){

        return res.status(400).json({ "message": "Username is required." })

    }

    try{
    
        const userIndex = userDB.users.findIndex(user => user.userName === userName)

        if(userIndex === -1){

            return res.status(404).json({ "message": "User not found." })

        }

        userDB.users.splice(userIndex, 1)

        await fsPromises.writeFile(dbPath, JSON.stringify(userDB.users, null, 2))

        logger.emit("log", `User deleted: ${userName}`)

        logger.emit("grade", "BONUS ✅ User deleted successfully")

        res.status(200).json({ "message": `User ${userName} deleted successfully.` })
    
    }catch(e){
    
        res.status(500).json({ "message": e.message })        
    
    }

}

export default deleteController