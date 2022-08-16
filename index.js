const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/movie');

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

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fecthing contact from db');
            return;
        };

        return res.render('home', {
            title : "Contact List",
            contact_list : contacts 
        });

        //return res.redirect('back');
    });
    
    
});

app.post('/create_contact', function(req, res){
    // add contact to the form on the website in ram only both details individually, usually used to add single
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // add contact to the form on the website in ram only directly as the contact fields contain both anyway 
    // contactList.push(req.body);
    // res.redirect('back');

    Contact.create({
        name: req.body.name,
        phone: req.body.phone}, function(err, newContact){
        if(err){
            console.log('error in creating contact');
            return;}

            console.log('******', newContact);
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