import { Router } from "express";
import { getUserId, getUsers, createUser, updateUser, deleteUser } from '../controllers/users.controller.js'
import { isAdmin, verifySignup} from "../middlewares/authJwt.js";
import { checkRoles } from "../middlewares/verifySignup.js";

const router = Router()

router.get('/', [verifySignup, isAdmin], getUsers)
      .get('/:id', [verifySignup, isAdmin], getUserId)
      .post('/', [verifySignup, isAdmin, checkRoles], createUser)
      .patch('/:id', [verifySignup, isAdmin, checkRoles], updateUser)
      .delete('/:id', [verifySignup, isAdmin], deleteUser)

export default router