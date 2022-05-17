import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import path from 'path'
import usersRoutes from './routers/userRouters.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/users', usersRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/Client/dist')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('API is runing....')
	})
}

const PORT = process.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
