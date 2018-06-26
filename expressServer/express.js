const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');

let app = express()

let data = [];
let dataPath = path.join(__dirname, 'data.json');
//THIS IS THE CREATION OF THE MIDDLEWARE//
app.use((req, res, next) => {
    fs.appendFileSync('log.txt', `${req.url}\n`);
    next();
})

//use this instead of Body Parser//
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//THIS WILL BE MY ROUTE FOR MY RESPONDS WITH RESULTS//
app.post('/contact-form', (req, err, res) => {
    fs.readFile(dataPath, 'utf8',(req, err, res, data) => {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            var jsonArray = JSON.parse(data);
            jsonArray.push(req.body);
            fs.writeFile(dataPath, JSON.stringify(jsonArray), 'utf8', function (err, res, data) {
                if (err) {
                    console.log(err);
                    res.send('did nit send');
                } else {
                    res.send('sent');
                }
            });
        }
    });
});



// THIS IS MY ROOT REQUEST//

// app.get('/', (req, res) => {
//     res.send('hello world');
// })


//THIS WILL BE THE EXPRESS STATIC PATH//



// var data = JSON.parse(dataPath);
// data.push({"teamId":"4","status":"pending"});
// dataPath = JSON.stringify(obj);



// fs.readFile(dataPath,{
//     encoding:"UTF-8"
// }, (err, data) => {
//     console.log(data);
// })

// fs.writeFileSync(dataPath, JSON.stringify(Array), err => {
//     console.log(err);
// });


app.listen(3003) 