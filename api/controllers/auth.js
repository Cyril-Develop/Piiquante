const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const nodemailer = require('nodemailer');

const tokenKey = process.env.PASSWORD_JWT;

//User signup
exports.signup = (req, res) => {
	bcrypt.hash(req.body.password, 10)
		.then(hash => {
			const user = new User({
				lastname: req.body.lastname,
				firstname: req.body.firstname,
				role: req.body.role,
				email: req.body.email,
				password: hash
			});
			user.save()
				.then(() => res.status(201).send({ message: "Utilisateur enregistré !" }))
				.catch(error => res.status(400).json({ error }));
		})
		.catch(error => res.status(500).json({ error }))
};

//User login
exports.login = (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email })
		.then(user => {
			if (!user) {
				res.status(401).send({ message: 'Informations erronées !' })
			} else {
				bcrypt.compare(password, user.password)
					.then(valid => {
						if (valid) {
							res.status(200).json({
								userId: user._id,
								token: jwt.sign({ userId: user._id }, tokenKey, { expiresIn: "24h" })
							});
						} else {
							res.status(401).send({ message: 'Informations erronées !' });
						}
					})
					.catch(error => res.status(500).json({ error }));
			}
		})
		.catch(error => res.status(500).json({ error }));
};


//Send email
const transporter = nodemailer.createTransport({
	host: "smtp-mail.outlook.com",
	secureConnection: false,
	port: 587,
	tls: {
		ciphers: 'SSLv3',
		rejectUnauthorized: false
	},
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD_EMAIL
	}
});

exports.sendEmail = (req, res) => {
	const mailOptions = {
		from: process.env.EMAIL,
		to: req.body.email,
		subject: 'Réinitialisation de mot de passe',
		text: `Pour réinitialiser votre mot de passe, veuillez cliquer sur ce lien : ${process.env.FRONT_URL}${req.body.userId}`
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			res.status(500).json({ error });
		} else {
			res.status(200).json({ message: 'Email envoyé' });
		}
	});
};