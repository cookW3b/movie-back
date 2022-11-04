import axios from "axios";
import mongoose from 'mongoose';
import MovieModel from './models/Movie.js';
import express, { json } from 'express';
import {data, genresArr, link} from './utils/getMovies.js';
import {registerValidation, loginValidation} from './validations/UserValidation.js';
import { UserController } from './controllers/index.js'
import { checkAuth } from "./utils/checkAuth.js";

mongoose
	.connect(link)
	.then(() => console.log('DB OK'))
	.catch((err) => console.log(err))

const app = express();
app.use(express.json());

app.post('/register', registerValidation, UserController.register);
app.post('/login', loginValidation, UserController.login);

app.post('/movies', async (req, res) => {
	try {
		data.results.forEach(item => {
			const getGen = () => {
				const arr = [];
				item.genre_ids.forEach(elem => {
					genresArr.forEach(gen => {
						if(gen.id === elem){
							arr.push(gen.name);
						}
					})
				})
				console.log(arr);
				return arr;
			}
			const genArray = getGen();
			const doc = new MovieModel({
				original_title: item.title,
				overview: item.overview,
				rating: item.popularity,
				poster: 'https://image.tmdb.org/t/p/w500/' + item.poster_path,
				genres: genArray,
				release_date: item.release_date
			});
			doc.save();
		})
		res.json({
			message: 'Ok'
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось получить фильмы'
		})
	}
})	

app.listen('4444', (err) => {
	if(err) {
		console.log(err);
	}
	console.log('Server OK')
})