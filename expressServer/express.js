const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');

let app = express()

//THIS IS THE CREATION OF THE MIDDLEWARE//
app.use((req, res, next) => {
    fs.appendFileSync('log.txt', `${req.url}\n`);
    next();
})

//THIS IS MY BODY PARSER//
app.use(bodyParser.urlencoded({extended: false}));

//THIS WILL BE MY ROUTE FOR MY RESPONDS WITH RESULTS//
app.post('/contact-form', (req, res) =>{
    console.log(req.body.name);
    console.log(req.body.email);
    res.send(`${req.body.name}   ${req.body.email}\n`)
})





// THIS IS MY ROOT REQUEST//

// app.get('/', (req, res) => {
//     res.send('hello world');
// })


//THIS WILL BE THE EXPRESS STATIC PATH//
app.use(express.static(path.join(__dirname, '../public')))


app.listen(3000)