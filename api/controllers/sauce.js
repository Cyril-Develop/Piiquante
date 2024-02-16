const { log } = require('console');
const Sauce = require('../models/sauce');
const fs = require('fs');

exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(response => res.status(200).json(response))
        .catch(error => res.status(404).json({ error }))
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }))
};

exports.createSauce = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Image not uploaded.' });
    }
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/piiquante/api/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => { res.status(201).json({ message: 'Sauce enregistrée !' }) })
        .catch(error => res.status(400).json({ error }))
};

exports.updateSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (!sauce) {
                return res.status(404).json({ message: 'Sauce non trouvée' });
            }
            if (req.auth.userId !== sauce.userId) {
                return res.status(403).json({ message: 'Non autorisé !' });
            }
            let sauceObject = {};
            if (req.file) {
                const filename = sauce.imageUrl.split("/").at(-1);
                fs.unlinkSync(`images/${filename}`);
                sauceObject = {
                    ...JSON.parse(req.body.sauce),
                    imageUrl: `${req.protocol}://${req.get('host')}/piiquante/api/images/${req.file.filename}`,
                };
            } else {
                sauceObject = {
                    ...JSON.parse(req.body.sauce)
                };
            }

            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (req.auth.userId !== sauce.userId) {
                res.status(403).json({ message: `Non autorisé !` })
            } else {
                const filename = sauce.imageUrl.split("/").at(-1);
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
                        .catch((error) => res.status(400).json({ error }));
                });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

//LIKE & DISLIKE
exports.likeSauce = async (req, res) => {
    try {
        const sauce = await Sauce.findOne({ _id: req.params.id });
        // Gestion des actions en fonction de la valeur de like
        if (req.body.like === 1) {
            handleLike(sauce, req.body.userId, res);
        } else if (req.body.like === -1) {
            handleDislike(sauce, req.body.userId, res);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

// Fonction pour gérer le like
async function handleLike(sauce, userId, res) {
    try {
        if (sauce.usersLiked.includes(userId)) {
            await Sauce.updateOne({ _id: sauce._id }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } });
        } else {
            await Sauce.updateOne({ _id: sauce._id }, { $inc: { likes: 1 }, $push: { usersLiked: userId } });
            // Si l'utilisateur avait déjà disliké la sauce, on retire le dislike
            if (sauce.usersDisliked.includes(userId)) {
                await Sauce.updateOne({ _id: sauce._id }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } });
            }
        }
        res.status(200).json({ message: 'Like/dislike mis à jour !' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Fonction pour gérer le dislike
async function handleDislike(sauce, userId, res) {
    try {
        if (sauce.usersDisliked.includes(userId)) {
            await Sauce.updateOne({ _id: sauce._id }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } });
        } else {
            await Sauce.updateOne({ _id: sauce._id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: userId } });
            // Si l'utilisateur avait déjà liké la sauce, on retire le like
            if (sauce.usersLiked.includes(userId)) {
                await Sauce.updateOne({ _id: sauce._id }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } });
            }
        }
        res.status(200).json({ message: 'Like/dislike mis à jour !' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}