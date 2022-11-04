import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async(req, res) => {
	try {
		const password = await req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		const doc = new UserModel({
			fullName: req.body.fullName,
			email: req.body.email,
			passwordHash: hash
		})

		const user = await doc.save();

		const token = jwt.sign({_id: user._id}, 'secretKey123', {expiresIn: '30d'});

		res.json({
			...user._doc,
			token
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось зарегистрироваться'
		})
	}
}

export const login = async(req, res) => {
	try {
		const password = await req.body.password;
		const user = await UserModel.findOne({email: req.body.email});
		if(!user) {
			return res.status(404).json({
				message: 'Пользователь не найден '
			})
		}
		
		const inValidPass = await bcrypt.compare(password, user._doc.passwordHash);

		if(!inValidPass) {
			return res.status(404).json({
				message: 'Не правильный логин или пароль'
			})
		}
		
		const token = jwt.sign({_id: user._id}, 'secretKey123', {expiresIn: '30d'});

		res.json({
			...user._doc,
			token
		})

	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось зарегистрироваться'
		})
	}
}

