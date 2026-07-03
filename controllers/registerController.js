import bycrypt from "bcrypt"
import fsPromises from "fs/promises"
import { fileURLToPath } from "url"
import path, { join, dirname } from "path"
import logger from "../middleware/logger.js"
import User from "../database/user.js"

const handleNewUser = async(req, res) =>{

    const { userName, email, password } = req.body

    if(!userName || !email || !password){
        
        return res.status(400).json({ "message": "Username, email, and password are required." })

    }

    const duplicate = await User.findOne({ $and: [{ userName: userName }, { email: email }] }).exec()

    if(duplicate){

        return res.status(409).json({ "message": "Username already exists." })

    }

    try{
    
        const hashedPassword = await bycrypt.hash(password, 10),
              newUser = { "userName": userName, "email": email, "password": hashedPassword }

        const user = new User(newUser)

        user.save()
            .then(result => res.send(result))
            .catch(err => console.log(err))

        res.status(201).json({ "success": `New user ${userName} created!` })

        logger.emit("log", `New user registered: ${userName} in MongoDB`)

        logger.emit("grade", "BONUS ✅ New user registered successfully in MongoDB")

    
    }catch(e){
    
        res.status(500).json({ "message": e.message })
    
    }

}

export default handleNewUser