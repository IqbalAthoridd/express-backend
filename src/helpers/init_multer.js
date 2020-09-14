const multer = require('multer')
const fs = require('fs')
const path = require('path')
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    const dir = './src/assets/img'

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage }).array('images', 4)
const upload2 = multer({ storage: storage }).single('image')

module.exports = {
  upload,
  upload2
}
