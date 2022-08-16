// require the library 
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/contact_list_db');

// acquire the connection to check if it is successful
const db = mongoose.connection;

// if error then show error
db.on('error', console.error.bind(console, 'error connecting to the database'));

// else print success message
db.once('open', function(){
    console.log('Connection successful bois!!!');
});