const multer = require('multer')
const fs = require('fs')
const path = require('path')

const size = 2000
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './assets/picture'

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: size,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('The uploaded file must be an image'), false)
    }
    cb(null, true)
  }

}).array('picture', 10)

const upload2 = multer({
  storage: storage,
  limits: size,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('The uploaded file must be an image'), false)
    }
    cb(null, true)
  }

}).single('avatar', 1)

const upload3 = multer({
  storage: storage,
  limits: size,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('The uploaded file must be an image'), false)
    }
    cb(null, true)
  }
})

module.exports = {
  upload,
  upload2,
  upload3
}
