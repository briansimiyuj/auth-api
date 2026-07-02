import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async() =>{

    try{
    
        mongoose.connect(process.env.MONGO_URI)
                
        console.log('MongoDB connected ✅')

    
    }catch(error){
    
        console.log("MongoDB failed to connect ❌", error.message)

        process.exit(1) 
    
    }

}

export default connectDB