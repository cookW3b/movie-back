import axios from 'axios';

let data;
let genresArr;

const link = 'mongodb+srv://Admin:movie2022@cluster0.eigqcpo.mongodb.net/?retryWrites=true&w=majority';

axios({
	method: 'get',
	url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=ab747cb8b98e85fdc56c1f3c35698471&language=en-US&page=1'
})
	.then(res => data = res.data);

axios({
	method: 'get',
	url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=ab747cb8b98e85fdc56c1f3c35698471&language=en-US'
})
	.then(res => genresArr = res.data.genres)

export {data, genresArr, link}