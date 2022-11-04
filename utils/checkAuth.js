import jwt from 'jsonwebtoken';


export const checkAuth = async(req, res) => {
	try {
		const token = (req.body.authorization || '');
		
		if(token) { 
			const decoded = jwt.verify(token, 'secretKey');
			return req.userId = decoded;
		} else{ 
			return res.status(404).json({
				message: 'Нет доступа'
			})
		}

	} catch (error) {
		res.status(404).json({
			message: 'Нет доступа'
		})
	}
}