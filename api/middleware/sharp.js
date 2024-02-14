const sharp = require('sharp');

const resize = (req, res, next) => {
    if (req.file) {
        sharp(req.file.path)
            .resize(450, 450)
            .toFile(`images/${req.file.filename}`, (err, info) => {
                if (err) {
                    console.log('Error resizing image:', err);
                    return res.status(400).json({ error: 'Image not resized.' });
                }
                console.log('Image resized successfully:', info);
                next();
            });
    } else {
        next();
    }
};

module.exports = resize;