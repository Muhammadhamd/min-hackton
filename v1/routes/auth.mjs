import express from "express"
import path from "path"
import { nanoid } from "nanoid"
import {client} from "./../../mongodb.mjs"
const __dirname = path.resolve()
const db = client.db("account-db");
const col = db.collection("accounts")
const router = express.Router()
const uniqueid = nanoid()

router.post("/register", async(req, res, next) => {

        const insertUserData = await col.insertOne({
          id:uniqueid ,
          username: req.body.username,
          useremail:req.body.email,
          usernumber: req.body.phonenumber,
          userpassword: req.body.password
        });
        console.log(uniqueid);
        // res.send("account created");
        res.redirect(`/account/${uniqueid}`)
     
    
      // Pass any error to the next middleware for handling
    
  });
  
router.get("/login",(req,res,next)=>{
    res.sendFile(path.join(__dirname , "public/auth.html"))    

    
})
export default router