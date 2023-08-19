import express from "express"
import path from "path"
// import cors from "cors"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose"
import cookieParser from 'cookie-parser'
const app = express()
const __dirname = path.resolve()
const mongodbURI =  process.env.mongodbURI || "mongodb+srv://muhammadhamdali572:hamdali99332@cluster0.g7j5dka.mongodb.net/userdatabase?retryWrites=true&w=majority";
import cors from "cors"
const SECRET = process.env.SECRET || "topsecret";
import authrouter from "./v1/routes/auth.mjs"
import apiv1 from "./v1/index.mjs"
import apiv2 from "./v2/index.mjs"



app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:4000', "*"],
    credentials: true
}));


app.use(apiv1)
app.use('/',express.static(__dirname))



app.use((req, res, next) => {

    console.log("req.cookies: ", req.cookies.token);

    if (!req?.cookies?.token) {
        // res.status(401).send({
        //     message: "include http-only credentials with every request"
        // })
        res.redirect("/signup")

     }

    jwt.verify(req.cookies.token, SECRET, function (err, decodedData) {
        if (!err) {

            console.log("decodedData: ", decodedData.email);

           
            const nowDate = new Date().getTime() / 1000;

            if (decodedData.exp < nowDate) {

                res.status(401);
                res.cookie('token', '', {
                    maxAge: 1,
                    httpOnly: true
                });
                res.redirect("/signup")

                return

            } else {

                console.log("token approved");

                res.locals.decodedData = decodedData.email;
                req.body.token = decodedData
                next()
            }
        } else {
            return res.redirect("/signup")
        }
    });
})



app.use(apiv2)


const PORT = process.env.PORT | 23445
app.listen(PORT,()=>{
    console.log(PORT)
})
