const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

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
//     pageTitle: "Coming Soon",
//     bodyMessage: 'FFN Content Coming Soon!'
//   });
// });

app.use(express.static(__dirname+ '/public'));

//home page
app.get('/',(req, res) => {
  res.redirect('ffn.jpg')
});

//about page
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

//projects page
app.get('/projects', (req, res) =>{
  res.render('projects.hbs', {
    pageTitle: 'Projects',
    pageMessage: 'Back on the block'
  });
});

//test page
app.get('/test', (req, res) => {
  res.render('test.hbs',{
    pageTitle: 'Test Access',
    pageMessage: 'Welcome to the developer test landing page'
  });
});

//bad page
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
})

//start server
console.log('Starting server...')
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
