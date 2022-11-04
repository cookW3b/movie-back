import jwt from 'jsonwebtoken';


export const checkAuth = async(req, res, next) => {
	try {
		const token = (req.headers.authorization || '').replace(/Bearer\s/, '');
		if(token) { 
			const decoded = jwt.verify(token, 'secretKey123');
			req.userId = decoded;
			next();
		} else{ 
			return res.status(404).json({
				message: 'Нет доступа',
				token
			})
		}

	} catch (error) {
		res.status(404).json({
			message: 'Нет доступа',
		})
	}
}