const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/images/')
    },
    filename: (req, file, cb) => {
        const image = file.originalname.split(".").pop()
        cb(null, `${Date.now()}.${image}` )
    },
})
const filter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage : storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: filter,
})

module.exports = upload