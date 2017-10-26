const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
//configs
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

//middleware

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}:: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs',{
//     pageTitle: "We'll be right back",
//     bodyMessage: 'Page is currently under construction!'
//   });
// });

app.use(express.static(__dirname+ '/public'));

app.get('/',(req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Fantasy Football Network',
    welcomeMessage: 'Welcome to the Fantasy Football Network!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
})
console.log('Starting server...')
app.listen(3000, () => {
  console.log('Server is up on port 3000')
});
