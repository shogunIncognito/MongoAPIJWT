import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";

const router = Router();

router.post('/signin', signin)
      .post('/signup', signup)

export default router;