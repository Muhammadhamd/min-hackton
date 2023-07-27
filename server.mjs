import express from 'express'
import path from "path"
const __dirname = path.resolve()
const app = express()
import apiv1 from "./v1/index.mjs"


// let user = true
// app.use((req,res,next)=>{
//     if (user == false) {
//         res.redirect("/login")
        
//     }

    // next()
    
// })
app.use(express.json())

app.use(apiv1)


app.use(express.static(__dirname))

const PORT = process.env.PORT | 2344
app.listen(PORT,()=>{
    console.log(PORT)
})