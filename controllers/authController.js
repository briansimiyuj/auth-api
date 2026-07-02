import bycrypt from "bcrypt"
import users from "../database/db.json" with { type: "json" }
import logger from "../middleware/logger.js"

const handleSignIn = async(req, res) =>{

    const { userName, password } = req.body

    if(!userName || !password){

        return res.status(400).json({ "message": "Username and password are required." })

    }

    const foundUser = users.find(user => user.userName === userName)

    if(!foundUser){

        return res.status(401).json({ "message": "User not found." })

    }

    try{
    
        const match = await bycrypt.compare(password, foundUser.password)

        if(!match){

            return res.status(401).json({ "message": "Unauthorized. Invalid password." })

        }

        res.json({ "message": `Welcome back ${userName}!` })

        logger.emit("log", `User signed in: ${userName}`)

        logger.emit("grade", "PART 3 ✅ Login successful with bcrypt password match")
    
    }catch(e){
    
        res.status(500).json({ "message": e.message })
    
    }

}

export default handleSignIn