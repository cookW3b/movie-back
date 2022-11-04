import { body } from "express-validator";

export const loginValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен содержать минимум 8 символов').isLength({min:8}),
];

export const registerValidation = [
	body('fullName', 'Неверно указано имя').isString(),
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен содержать минимум 8 символов').isLength({min:8}),
]