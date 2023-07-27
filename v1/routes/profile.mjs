import express from "express"
import path from "path"
const __dirname = path.resolve()
const router = express.Router()
import {client} from "./../../mongodb.mjs"
const db = client.db("account-db");
const col = db.collection("accounts")

router.get(`/account/:userId`, async(req,res,next)=>{

   let  accountid = req.params.userId

    const account = await col.findOne({id: accountid})

    if (account) {
        res.send(account)
    }else{
    res.send("profile no found")

    }

    // res.sendFile(path.join(__dirname , "public/profile.html"))
})

export default router