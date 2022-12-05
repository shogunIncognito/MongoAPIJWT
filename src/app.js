import express from 'express'
import morgan from 'morgan'
import productsRoutes from './routes/products.routes.js'
import basicRoutes from './routes/basic.routes.js'
import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/users.routes.js'
import { createRoles } from './libs/initialSetup.js'
import './db/db.js'

const app = express()
createRoles()

app.use(express.json())
app.use(morgan('dev'))

app.use('/auth', authRoutes)
app.use('/products', productsRoutes)
app.use('/users', usersRoutes)
app.use(basicRoutes)

export default app