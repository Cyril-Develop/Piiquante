const Sauce = require('../models/sauce');
const fs = require('fs');

exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(response => res.status(200).json(response))
        .catch(error => res.status(404).json({error}))
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}))
};

exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce ({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => {res.status(201).json({message: 'Sauce enregistrée !'})})
        .catch(error => res.status(400).json({error}))
};

exports.updateSauce = (req, res) => {
    let sauceObject = {};
    req.file ? (
        Sauce.findOne({_id: req.params.id})
            .then(sauce => {
                if(req.auth.userId !== sauce.userId){
                    res.status(403).json({message: `Non autorisé !`})
                } else {
                    const filename = sauce.imageUrl.split("/").at(-1);
                    fs.unlinkSync(`images/${filename}`)
                }
            }),
        sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            }
        ) : sauceObject = {...req.body};
    Sauce.updateOne({_id: req.params.id},{...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Sauce modifiée !'}))
        .catch((error) => res.status(400).json({error}))
};

exports.deleteSauce = (req, res) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            if(req.auth.userId !== sauce.userId){
                res.status(403).json({message: `Non autorisé !`})
            } else{
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
  
exports.likeSauce = (req, res) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            switch(req.body.like) {
                case -1 : {
                    sauce.dislikes++;
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.save();
                    break;
                }
                case 1 : {
                    sauce.likes++;
                    sauce.usersLiked.push(req.body.userId);
                    sauce.save();
                    break;
                }
                case 0 : {
                    if(sauce.usersLiked.indexOf(req.body.userId) !== -1){
                        sauce.likes--
                        sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId), 1);
                    } else if (sauce.usersLiked.indexOf(req.body.userId) !== 1) {
                        sauce.dislikes--;
                        sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId), 1)
                    }
                    sauce.save();
                }
            }
            res.status(200).json({message: 'Avis enregistré !'})
        })
        .catch(error => res.status(500).json({error}))
};
