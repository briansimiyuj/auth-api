import EventEmitter from "events"
import fs from "fs"

const logger = new EventEmitter()

logger.on("log", message =>{

    fs.mkdir("logs", { recursive: true }, error =>{

        if(error) throw error

        const date = new Date().toLocaleDateString(),
              time = new Date().toLocaleTimeString(),
              timeStamp = `${date} ${time}`

        fs.appendFile("logs/request.log", `${timeStamp} ${message}\n`, error =>{

            if(error) throw error

            console.log('Log saved')

        })

    })

})

logger.on("grade", message =>{

    fs.mkdir("logs", { recursive: true }, error =>{

        if(error) throw error

        const date = new Date().toLocaleDateString(),
              time = new Date().toLocaleTimeString(),
              timeStamp = `${date} ${time}`

        fs.appendFile("logs/grade.log", `${timeStamp} ${message}\n`, error =>{

            if(error) throw error

            console.log('Grade logged')

        })

    })

})

export default logger