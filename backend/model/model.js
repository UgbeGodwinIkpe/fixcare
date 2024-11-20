// Importing the necessary modules 
const mongodb = require('mongoose'); 

// Creating the user's schema 
const userSchema = new mongodb.Schema({
    region: { type: String}, 
    country: { type: String }, 
    password: { type: String }, 
    emailAddress: { type: String}, 
    firstname: { type: String }, 
    middlename: { type: String }, 
    lastname: { type: String }, 
    premisesType: { type: String},
    distanceFromCenter: { type: String }, 
    contact: { type: String }, 
    houseNumber: { type: String }, 
    streetName: { type: String }, 
    city: { type: String }, 
    state: { type: String }, 
    landmark: { type: String }, 
    pinCode: { type: String }, 
    referralCode: { type: String }, 
    yearlyFee: { type: String }, 

})


// Creating the user collection 
const USERS = mongodb.model('users', userSchema); 

// Exporting the modules 
module.exports = { USERS }; 