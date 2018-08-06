const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Character } = require('../models');

const TEMP_DIR = path.join(__dirname, '..', 'temp');
const router = express.Router();
const upload = multer({ dest: TEMP_DIR });

router.post('/', handleFileUpload(), (req, res) => {
  const file = req.files.file[0];
  console.log(file)
  const { type, id } = req.body;
  const extension = path.extname(file.originalname).toLowerCase();
  const targetPath = path.join(__dirname, '..', 'public', 'character_images', file.originalname);

  if (extension === '.png' || extension === '.jpg') {
    fs.rename(file.path, targetPath, (err) => {
      if (err) return handleError(err, res);

      if (type === 'character') {
        const query = { _id: id };
        Character
          .updateOne(query, { $set: { image: file.originalname } })
          .then(char => {
            res
              .status(200)
              .json({ success: true, filename: file.originalname, character: char });
          })
          .catch(error => handleError(error, res));
      }
    })
  } else {
    fs.unlink(file.path, err => {
      if (err) return handleError(err, res);
      handleError('only png and jpg supported', res)
    })
  }
});

function onSuccess(filename) {

}

function handleError(err, response) {
  console.error(err);
  response.status(500)
          .json({ success: false, error: err })
}

function handleFileUpload() {
  return upload.fields([
    { name: 'name', maxCount: 1 },
    { name: 'type', maxCount: 1 },
    { name: 'id', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]);
}

// TODO: documentation



module.exports = router;
