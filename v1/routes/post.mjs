import express from "express"
import mongoose from "mongoose"
import path from "path"
import axios from "axios"
import { ObjectId } from "mongodb"

const __dirname = path.resolve()
const router = express.Router()
import {client} from "./../../mongodb.mjs"

const db = client.db("userdatabase"),
      userCol = db.collection("users"),
      postsCol = db.collection('posts')


   




const postSchema = new mongoose.Schema({

    username:{
        type:String,
    },
    sellername:{
        type:String,
    },
    userId:{
        type:String,

    },
    timeStamp:{
        type: Date,
        default: Date.now
    },
    description:{
        type:String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    waranty:{
        type:String,
        required:true
    },
    returnDays:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    } ,
    image:{
        type:String,
        required:true
    } ,
        
})

const postModel = mongoose.model("Post", postSchema)


  
       
    

router.post("/post", async(req,res)=>{

    const currentUserEmail = res.locals.decodedData


    const userData =await userCol.findOne({email:currentUserEmail})
   const {heading , description , waranty , returnDays  , Deliverywillbe , price , image}= req.body

   
   const post = await postModel.create({
    username: userData.username,
    userId: userData._id,
    sellername:userData.name,
    price: price,
    waranty: waranty,
    returnDays: returnDays, 
    timeStamp: new Date(),
    heading: heading,
    description: description,
    image: image,
  });
   console.log(post)
   res.send("created")
})

router.get("/posts", async(req,res ,next)=>{
    
    
    const postsData =  postsCol.find({})
 
    const posts = await postsData.toArray()

        res.send(posts)
})
router.get("/post/:postId",async (req,res)=>{
    const postId = req.params.postId

    const post = await postsCol.findOne({ _id: new ObjectId(postId)})

    if (!post) {
        res.send("this post maybe deleted or disent exist")
        return;
    }

    res.sendFile(path.join(__dirname,"public/post.html"))

 
      
})
router.get("postdata/:postId",async(req ,res)=>{

    const postId = req.params.postId

    const postdata = await postsCol.findOne({ _id: new ObjectId(postId)})
    res.send(postdata)
})

export default router