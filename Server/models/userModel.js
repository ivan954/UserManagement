import mongoose from 'mongoose'

const UserSchema =  mongoose.Schema({
	Name: String,
	Email: String,
	Street: String,
	City: String,
	ZipCode: Number,
	Tasks: [
		{
			Title: String,
			Completed: Boolean,
		},
	],

	Posts: [
		{
			Title: String,
			Body: String,
		},
	],
});

const User = mongoose.model('User', UserSchema)

export default User