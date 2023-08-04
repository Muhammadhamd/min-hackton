import express from "express"
import mongoose from "mongoose"
import path from "path"
import axios from "axios"
const __dirname = path.resolve()
const router = express.Router()




   





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
    
        
})

const postModel = mongoose.model("Post", postSchema)

// Middleware to fetch and store user data
// const UserData = async (req, res, next) => {
//     try {
//       const response = await axios.get('/currentuser');
//       const userData = response.data;
//       req.userData = userData;
//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error');
//     }
//   };
router.post("/post", async(req,res)=>{

   
   const {heading , description , waranty , returnDays  , Deliverywillbe , price , image}= req.body

 
    // Access user data from req.userData
    const userData = req.userData;


   const post = await postModel.create({
    username: 'userData.username',
    userId:' userData._id',
    sellername: 'userData.name',
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

router.get("/post",(req,res)=>{

    res.sendFile(path.join(__dirname,"public/post.html"))
})

export default router