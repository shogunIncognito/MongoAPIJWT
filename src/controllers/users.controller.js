import User from "../models/User.js";
import Rol from "../models/Role.js";

const serverError = (res) => res.status(500).json({ code: 500, message: 'Internal Server Error' });
const notFoundError = (res) => res.status(404).json({ code: 404, message: 'User not found' })

export const getUsers = async (req, res) => {
    try {
        const data = await User.find()
        res.json(data)
    } catch (error) {
        serverError(res)
    }
}

export const getUserId = async (req, res) => {
    try {
        const { id } = req.params
        const data = await User.findById(id)

        if (!data) return notFoundError(res)

        res.json(data)
    } catch (error) {
        serverError(res)
    }
}

export const createUser = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body
        const userExist = await User.find({ username })
        const emailExist = await User.find({ email })

        if (userExist.length != 0 || emailExist.length != 0) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const user = new User({
            username,
            email,
            password: await User.encryptPassword(password),
        })

        if (roles) {
            const values = await Rol.find({ name: { $in: roles } })
            user.roles = values.map(rol => rol._id)
        } else {
            const rol = await Rol.findOne({ name: 'user' })
            user.roles = [rol._id]
        }

        await user.save()

        res.status(201).json({ message: "User created" })
    } catch (error) {
        serverError(res)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { body, params: { id } } = req

        if (body.password) body.password = await User.encryptPassword(body.password)
        const data = await User.findByIdAndUpdate(id, body, { new: true })

        if (!data) return notFoundError(res)

        res.json({ message: "User updated" })
    } catch (error) {
        serverError(res)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const data = await User.findByIdAndDelete(id)

        if (!data) return notFoundError(res)

        res.json({ message: "User deleted" })
    } catch (error) {
        serverError(res)
    }
}