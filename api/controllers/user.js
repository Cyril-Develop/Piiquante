const bcrypt = require('bcrypt');
const User = require('../models/user');

//Check user email
exports.getUserId = (req, res) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				res.status(404).send({ message: 'Aucun compte n\'est associé à cet email' });
			} else {
				res.status(200).json({ userId: user._id });
			}
		})
		.catch(error => res.status(500).json({ error }));
}

//Update user password
exports.updatePassword = (req, res) => {
	bcrypt.hash(req.body.password, 10)
		.then(hash => {
			User.updateOne({ _id: req.params.id }, { password: hash })
				.then(() => res.status(200).json({ message: "Mot de passe modifié !" }))
				.catch(error => res.status(400).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};

//Get user infos
exports.getUserInfos = (req, res) => {
	User.findOne({ _id: req.params.id })
		.then(user => res.status(200).json({
			lastname: user.lastname,
			firstname: user.firstname,
			role: user.role,
		}))
		.catch(error => res.status(404).json({ error }));
};