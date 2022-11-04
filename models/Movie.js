import { Schema, model } from "mongoose";

const movieSchema = new Schema({
		original_title: String,
		overview: String,
		rating: Number,
		genres: {
			type: Array, 
			default: []
		},
		poster: String,
		release_date: String
})

export default model('Movie', movieSchema);