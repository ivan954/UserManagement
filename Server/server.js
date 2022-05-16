import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import colors from 'colors'
import usersRoutes from './routers/userRouters.js'
import cors from 'cors'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/users', usersRoutes)

const PORT = process.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
