var express = require('express');
var cors = require('cors');
require('dotenv').config()
//post to api/fileanalyse
var app = express();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next){
  const {originalname, mimetype, size} = req.file;
  req.locals = [originalname, mimetype, size];
  next()
}, (req, res) => {
  const [name, type, size] = req.locals;
  res.json({name, type, size})
})
