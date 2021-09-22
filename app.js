const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
//getting started with mongoose
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}
const port = 8000;
//start a project with npm init in terminal then install express and pug
//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    Phone: String,
    email: String,
    address: String,
    desc: String,
  });

const Contact = mongoose.model('Contact', contactSchema);
//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')); // for serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF 
app.set('view engine','pug'); //set the template engine as pug
app.set('views',path.join(__dirname,'views')); //set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug',params);
})
//post request
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database")
    }).catch(()=>{
        res.status(400).send("item was not saved to database")
    });
    // res.status(200).render('contact.pug', params);
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});