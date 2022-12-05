import User from '../models/User.js';
import Jwt from 'jsonwebtoken';
import { SECRET } from '../db/config.js';
import Rol from '../models/Role.js';

export const signup = async (req, res) => {
    const { username, email, password, roles } = req.body;

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

    const savedUser = await user.save();
    console.log(savedUser);

    const token = Jwt.sign({ id: savedUser._id }, SECRET, {
        expiresIn: 86400
    })

    res.json({ token })
}

export const signin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).populate('roles')

    if (!user) return res.status(400).json({ message: 'User not found' })

    const matchPassword = await User.comparePassword(password, user.password)

    if (!matchPassword) return res.status(401).json({ message: "Incorrect password" })

    const token = Jwt.sign({ id: user._id }, SECRET, {
        expiresIn: 86400
    })

    res.json({ token })
}