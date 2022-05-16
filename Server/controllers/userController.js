import User from '../models/userModel.js'
import AsyncHandler from 'express-async-handler'

//@desc Fetch all users
//@route Get /api/users
const getAllUsers = AsyncHandler(async (req, res) => {
	const users = await User.find({})

	res.json(users)
})

//@desc Fetch singel user
//@route Get /api/users/:id
//@access public
const getUserById = AsyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('user not found')
	}
})

//@desc Create a user
//@route POST /api/users
//@access public
const createUser = AsyncHandler(async (obj, res) => {
	const user = new User({
		Name: obj.body.Name,
		Email: obj.body.Email,
		Street: obj.body.Street,
		City: obj.body.City,
		ZipCode: obj.body.ZipCode,
		Tasks: obj.body.Tasks,
		Posts: obj.body.Posts,
	})

	const createUser = await user.save()
	res.status(201).json('Created !')
})

//@desc Update a user
//@route PUT /api/users
//@access public
const updateUser = AsyncHandler(async (req, res) => {
	const { Name, Email, Street, City, ZipCode, Tasks, Posts } = req.body

	const user = await User.findById(req.params.id)

	if (user) {
		user.Name = Name
		user.Email = Email
		user.Street = Street
		user.City = City
		user.ZipCode = ZipCode
		user.Tasks = Tasks
		user.Posts = Posts

		const updatedUser = await user.save()
		res.json('Updated !')
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

//@desc Delete a user
//@route Delete /api/users/:id
//@access Privet/Admin
const deleteUser = AsyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		await user.remove()
		res.json({ message: 'Product removed' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

export { getAllUsers, getUserById, createUser, updateUser, deleteUser }
