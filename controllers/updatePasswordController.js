import fsPromises from "fs/promises"
import bcrypt from "bcrypt"
import users from "../database/db.json" with { type: "json" }
import logger from "../middleware/logger.js"
import User from "../database/user.js"

const updatePasswordController = async(req, res) =>{

    const { email, password } = req.body

    if(!email){

        return res.status(400).json({ "message": "Email is required." })

    }

    if(!password){

        return res.status(400).json({ "message": "Password is required." })

    }

    const foundUser = await User.findOne({ email })

    if(!foundUser){

        return res.status(400).json({ "message": "User not found." })

    }

    const hashedPassword = await bcrypt.hash(password, 10)

    foundUser.password = hashedPassword

    await foundUser.save()
          .then(result => res.send(result))
          .catch(err => console.log(err))

    logger.emit("log", `Password updated for user: ${userName} via MongoDB`)

    logger.emit("grade", "BONUS ✅ Password updated successfully in MongoDB")

    res.status(200).json({ "message": `Password updated for user ${userName}.` })

}

export default updatePasswordController