import express from "express"
import authRouter from "./routes/auth.mjs"
import profileRouter from "./routes/profile.mjs"
const router = express.Router()

router.use(authRouter)
router.use(profileRouter)

export default router