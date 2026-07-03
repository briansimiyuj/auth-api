import logger from "../middleware/logger.js"
import User from "../database/user.js"

const deleteController = async(req, res) =>{

    const { userName } = req.params

    if(!userName){

        return res.status(400).json({ "message": "Username is required." })

    }

    try{
    
        const user = await User.findOne({ userName })

        if(!user){

            return res.status(404).json({ "message": "User not found." })

        }

        await User.deleteOne({ userName })

        logger.emit("log", `User deleted: ${userName} via MongoDB`)

        logger.emit("grade", "BONUS ✅ User deleted successfully in MongoDB")

        res.status(200).json({ "message": `User ${userName} deleted successfully.` })
    
    }catch(e){
    
        res.status(500).json({ "message": e.message })        
    
    }

}

export default deleteController