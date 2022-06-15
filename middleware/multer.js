const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file.diskStorage",file)
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    console.log("file.originalname",file)
      cb(null, file.originalname)
  }
})

let uploadFile = multer({
  storage: storage,
});

module.exports = {
  uploadFile
}
