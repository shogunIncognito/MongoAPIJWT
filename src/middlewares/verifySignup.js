import Rol from '../models/Role.js';

export const checkRoles = async (req, res, next) => {
    try {
        const { roles } = req.body

        if (roles) {
            const rolesFound = await Rol.find({ name: { $in: roles } })
            return rolesFound.length > 0 ? next() : res.status(400).json({ message: 'Role does not exist' })
        }

        next()
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Internal server error' })
    }
}