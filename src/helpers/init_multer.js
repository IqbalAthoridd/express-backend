const multer = require('multer')
const fs = require('fs')
let path = require('path')
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    const dir = '../assets/img'

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

module.exports = {
  upload
}
