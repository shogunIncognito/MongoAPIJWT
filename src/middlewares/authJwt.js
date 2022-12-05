import Jwt from "jsonwebtoken"
import { SECRET } from "../db/config.js"
import Role from '../models/Role.js'
import User from "../models/User.js"

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)

        const [rol] = await Role.find({ _id: { $in: user.roles } })

        if (rol.name != 'admin') return res.status(401).json({ message: "Unauthorized" })

        next()
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Internal server error' })
    }
}

export const verifySignup = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']

        if (!token) return res.status(403).json({ message: "No token provided" })

        const decoded = Jwt.verify(token, SECRET)
        req.userId = decoded.id

        const user = await User.findById(decoded.id, { password: 0 })

        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" })
    }
}