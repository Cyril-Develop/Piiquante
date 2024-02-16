const multer = require('multer');

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0];
        callback(null, name + Date.now())
    }
});

//Export storage function and define how many file can be send
module.exports = multer({storage}).single("image");