const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Movie0 = require('./models/movie');
// const Movie = require('./models/movie');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.use(express.urlencoded());
app.use(express.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(express.static('assets'));

var contactList = [
    {
        name : "Parag",
        phone: "8652846653"
    },
    {
        name : "Pragya",
        phone : "9287453334"
    },
    {
        name : "Krishnan",
        phone : "4488741325"
    },
    {
        name : "Khadija",
        phone : "9969133407"
    },
    {
        name : "Bhargav",
        phone : "7415425182"
    }

]

app.get('/', function(req, res){

    Movie0.find({}, function(err, movies){
        if(err){
            console.log('Error in fecthing movie from db');
            return;
        };

        return res.render('home', {
            title : "Movie List",
            movie_list : movies 
        });

        //return res.redirect('back');
    });
    
    
});

app.post('/create_movie', function(req, res){
    // var a = req.body.dates;
    let a = req.body.dates = new Date().toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"});
    // add contact to the form on the website in ram only both details individually, usually used to add single
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // add contact to the form on the website in ram only directly as the contact fields contain both anyway 
    // contactList.push(req.body);
    // res.redirect('back');

    Movie0.create({
        name: req.body.name,
        genre: req.body.genre,
        date: a}, function(err, newMovie){
        if(err){
            console.log('error in creating movie recommendation');
            console.log(req.body);
            return;}

            console.log('******', req.body.dates);
            console.log(a);
            res.redirect('back');
    });

});

app.get('/practice', function(req,res){

    return res.render('practice', {
        title : 'playing with EJS or some shit'
    });
});

//for deleting a contact
app.get('/delete-contact', function(req, res){
    // get the id from the query in the URL
    // console.log(req.params.phone);
    let id = req.query.id;

    // find the contact using the id in the database and delete it
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('There was an error deleting the contact from the database');
            return;
        }
        return res.redirect('back');

    });

});

app.listen(port, function(err){
    if(err){
        console.log('Yep, there is a very bad error here!', err);
    }

    console.log('Aiyla tera server chal raha hai? magic bro');
});