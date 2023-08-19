import express from "express"
import authRouter from "./routes/auth.mjs"
import userdata from "./routes/userinfo.mjs"
const router = express.Router()

router.use(authRouter)
router.use(userdata)
// router.use(profileRouter)

export default router