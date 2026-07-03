import bycrypt from "bcrypt"
import users from "../database/db.json" with { type: "json" }
import User from "../database/user.js"

const handleSignIn = async(req, res) =>{

    const { email, password } = req.body

    if(!email || !password){

        return res.status(400).json({ "message": "Username and password are required." })

    }

    const foundUser = await User.findOne({ email })

    if(!foundUser){

        return res.status(401).json({ "message": "User not found." })

    }

    try{
    
        const match = await bycrypt.compare(password, foundUser.password)

        if(!match){

            return res.status(401).json({ "message": "Unauthorized. Invalid password." })

        }

        res.json({ "message": `Welcome back ${foundUser.userName}!` })

        logger.emit("log", `User signed in: ${foundUser.userName} via MongoDB`)

        logger.emit("grade", "BONUS ✅ User signed in successfully via MongoDB")
    
    }catch(e){
    
        res.status(500).json({ "message": e.message })
    
    }

}

export default handleSignIn