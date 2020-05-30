// Requiring npm packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// connecting mongodb with mongoose
mongoose.connect('mongodb://localhost:27017/formDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Setting my mongoose schema
const formSchema = new mongoose.Schema({
    first: String,
    last: String,
    day: Number,
    month: Number,
    year: Number,
    citizen: String,
    country: String,
    phone: Number,
    email: String,
    address: String,
    city: String,
    state: String,
    zip: Number
});

// Setting my mongoose model
const Form = mongoose.model('Form', formSchema);
// Setting up my app constant
const app = express();

// Setting up my CSS
app.use(express.static('public'))

// Setting up body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up my page
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post('/', (req, res) => {
    const info = new Form({
        first: req.body.first_name,
        last: req.body.last_name,
        day: req.body.day,
        month: req.body.month,
        year: req.body.year,
        citizen: req.body.citizen,
        country: req.body.country,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    });

    info.save((err) => {
        if (err) {
            res.sendFile(__dirname + '/failure.html');
        } else {
            res.sendFile(__dirname + '/success.html');
        }
    });
});




app.listen(3000, () => {
    console.log('Listening on port 3000!!!!');
});