const express = require("express")
const cors = require("cors")
const multer = require("multer")
const uuid = require('uuid')
const getFileExtFromName = require('./utils').default

const hostname = "127.0.0.1";
const port = 3000;
const app = express();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      console.log(file)
      cb(null, `${uuid.v4()}.${getFileExtFromName(file.originalname)}`)
    }
  }),
});

app.use(cors({ origin: "*" }));

app.post("/api/upload", upload.single("filedata"), (req, res) => {
  const filedata = req.file;
  if (!filedata) res.status(400).json({ msg: "PLEASE UPLOAD FILE" })
  else res.status(200).json(filedata)
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});
