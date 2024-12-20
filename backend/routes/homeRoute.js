// Importing the necessary modules 
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { USERS } = require("../model/model");

// Creating the router object 
const router = express.Router();

// Creating the register route 
router.post('/register', async(req, res) => {
    // Using the try catch block to connect to the database 
    try {
        // Search the database to see if the user with the specified 
        // email address is registered on the database 
        let user = await USERS.findOne({
            emailAddress: req.body.emailAddress
        });

        // if the user exits on the database, execute the block 
        // of code below 
        if (user) {
            // Create an error message 
            let errorMessage = JSON.stringify({
                "message": "The user with the email address is already registered",
                "status": "error",
                "statusCode": 409,
            });

            // Sending the error message 
            return res.send(errorMessage);
        }

        // Else if the email for the user was not found on the database, 
        // execute the block of code below 
        else {
            // Encrypt the password and create a salt hash 
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            // Saving the new registerd user 
            const newUser = new USERS({
                region: req.body.region,
                country: req.body.country,
                password: req.body.password,
                emailAddress: req.body.emailAddress,
                firstname: req.body.firstname,
                middlename: req.body.middlename,
                lastname: req.body.lastname,
                premisesType: req.body.premisesType,
                distanceFromCenter: req.body.distanceFromCenter,
                contact: req.body.contact,
                houseNumber: req.body.houseNumber,
                streetName: req.body.streetName,
                city: req.body.city,
                state: req.body.state,
                landmark: req.body.landmark,
                pinCode: req.body.pinCode,
                referralCode: req.body.referralCode,
                yearlyFee: req.body.yearlyFee,
            });
            console.log(newUser)
                // Savin gthe new user on the database 
            await newUser.save();

            // Generating the success message 
            let successMessage = JSON.stringify({
                "message": "User newly registered",
                "status": "success",
                "statusCode": 200
            });

            // Return the success message 
            return res.send(successMessage);
        }
    }

    // Catch the error message 
    catch (error) {
        // Creating the error message 
        let errorMessage = JSON.stringify({
            "message": error.toString().trim(),
            "status": "error",
            "statusCode": 500,
        });

        // Sending back the error message 
        return res.send(errorMessage);
    }
})

// Creating a route for registering users 
router.post('/login', async(req, res) => {
    // Searching the database to see if the user with the specified 
    // email address is registered on the database 
    try {
        // Get the user details 
        const user = await USERS.findOne({
            emailAddress: req.body.emailAddress
        });

        // If the email address specified was found on the database, 
        // execute the block of code below 
        if (user) {
            // Get the user password, and hash the password 
            const userPassword = req.body.password;
            const hashedPassword = user.password;

            // checking if the password hashed value is correct 
            const isMatch = bcrypt.compareSync(userPassword, hashedPassword);

            // Getting the secret key 
            const jwtKey = process.env.jwtKey;

            // Checking if the passwords are correct 
            if (isMatch) {
                // Create a JWT token 
                const token = jwt.sign({
                    email: user.emailAddress,
                    isLoggedIn: true,
                    id: user._id
                }, jwtKey, {
                    expiresIn: '30 days',
                })

                // Creating the success message 
                let successMessage = JSON.stringify({
                    "message": "Logged in successfully",
                    "status": "success",
                    "xAuthToken": token,
                    "statusCode": 200,
                });

                // Sending back the error message 
                return res.send(successMessage);
            }

            // else if the password do not match, execute 
            // the code block below 
            else {
                // Create the error message 
                let errorMessage = JSON.stringify({
                    "message": "Invalid email or password",
                    "status": "error",
                    "statusCode": 401,
                });

                // Sending the error message 
                return res.send(errorMessage);
            }
        }

        // Else if the user does not exists on the database
        else {
            // Create the error message 
            let errorMessage = JSON.stringify({
                "message": "Invalid email or password",
                "status": "error",
                "statusCode": 401,
            })

            // Sending the error message 
            return res.send(errorMessage);
        }
    }

    // Catch the error 
    catch (error) {
        // Creating the error message 
        let errorMessage = JSON.stringify({
            "message": error.toString().trim(),
            "status": "error",
            "statusCode": 500
        })

        // Sending back the error message 
        return res.send(errorMessage);
    }
})

// Exporting the router 
module.exports = router;