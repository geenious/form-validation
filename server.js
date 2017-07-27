const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/signup', function(req, res) {
  console.log('The body', req.body);
  res.render('signup', req.body);
});

app.listen(3000, function() {
  console.log("What's up port 3000!");
});
