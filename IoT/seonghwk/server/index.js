const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './store/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("Upload Successful!");
  console.log(req.body)
  console.log("Received")
});

app.get("/album", (req, res) => {
  return res.download(`./store/test.avi`);
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});