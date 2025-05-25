const multer = require('multer');
const path = require('path');

// Define storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images'); // Folder where images will be stored
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename); // Use a unique filename for each image
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
