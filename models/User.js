import { Schema, model } from "mongoose";

const UsersSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	passwordHash: {
		type: String,
		required: true
	},
	avatarUrl: String,
}, {
	timestamps: true,
});

export default model('users', UsersSchema);