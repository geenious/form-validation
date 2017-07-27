const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const app = express();

// mustache hack
let mustacheInstance = mustacheExpress();
mustacheInstance.cache = null;
app.engine('mustache', mustacheInstance);
// app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
})

app.post('/signup', function(req, res) {
  req.check('name', 'Name is required').notEmpty();
  req.check('name', 'Name cannot be over 100 characters').len(0, 100);
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Email cannot be over 100 characters').len(0, 100);
  req.check('birth', )
  req.check('birth', 'Year must be between 1900 and 2017').optional({ checkFalsy: true }).isInt({ min: 1900, max: 2017});
  req.check('position', 'You must select a position').notEmpty();
  req.check('password', 'Password is required and must be at least 8 characters').len(8);

  req.getValidationResult().then(function(result) {
    if(result.isEmpty()) {
      res.render('signup', req.body);
    }
    else {
      let data = {};
      data.errors = result.array();
      data.formData = req.body;
      res.render('index', data);
    }
  });

});

app.listen(3000, function() {
  console.log("What's up port 3000!");
});

// req.check({
//   'name': {
//     optional: false,
//     isLength: {
//       options: [{min: 1, max: 100}]
//     },
//     errorMessage: 'Invalid Name'
//   }
// });


// req.getValidationResult().then(function(result) {
//   console.log(result.isEmpty());
//   if (result.isEmpty()) {
//     // we are valid
//     res.render('signup', req.body);
//   }
//   else{
//     // we are not valid
//     data.errors = result.array();
//     res.render('index', data);
//   }
// });
// console.log('The body', req.body);
