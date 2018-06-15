const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
//view engine to render html pages
hbs.registerPartials(__dirname + '/views/partials');
//express helpers
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase()
})
app.set('view engine','hbs')
//express middle-ware

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} - ${req.url}`;
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err)=>{
    console.log('Unable to append to server.log')
  })
  next()
});
// app.use((req,res,next) =>{
//   res.render('maintenance.hbs')
// });
app.use(express.static(__dirname + '/public'))
app.get('/', (req,res)=>{
  res.render('index.hbs',{
    pageTitle : 'PCOIN ICO',
    welcomeMessage : 'We are trading the first african crypto-currency',
    currentYear : new Date().getFullYear()
  });
});

app.get('/about', (req,res)=>{
  res.render('About.hbs',{
    pageTitle : 'About Page',
    welcomeMessage : 'Some Text Here',
    currentYear : new Date().getFullYear()
  });
});

app.get('/bad', (req,res)=>{
  res.send({
    errorMessage : 'Marlfomed Request'
  })
})

app.listen(3000, ()=>{
  console.log('Server is up on port 3000')
});
