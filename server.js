// temp change
// Variables to import the required modules from NPM
const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 1337;
const server = app.listen(port, function () {
    console.log('listening on port ' + port);
});

app.use(bodyparser.urlencoded({ extended: false }));

// This neat little use of the express module which serves a static webpage, which I placed in the website directory (not necessary but I saw it used in a video and decided to use it)
app.use(express.static('website'));

// post request when a user creates a file with a new customer ID. If the customer ID text file exists the cusID is set to false and returned the the client, which then triggers an alert for the user that the customer already exists. If it doesn't exist the file is created with the provided information
app.post('/customer/data/create', (req, res) => {
    let postBody = req.body;
    let cusID = postBody.customerID;
    postJSON = JSON.stringify(postBody);

    if (fs.existsSync(`./data/${cusID}.txt`)) {
        cusID = false;
        res.send(cusID);
    } else {
        fs.writeFile(`./data/${cusID}.txt`, postJSON, function (err) {
            if (err) {
                console.log(err);
            } else {
                res.send(cusID);
            }
        })
    }
})

// post request when a user updates customer information with the customer ID they provide. If the correct file exists the file is updated with the provided information. If the file does not exist a response is sent back to the server to inform the user that customer data could not be updated
app.post('/customer/data/update', (req, res) => {
    let postBody = req.body;
    let cusID = postBody.customerID;
    postJSON = JSON.stringify(postBody);

    if (fs.existsSync(`./data/${cusID}.txt`)) {
        fs.writeFile(`./data/${cusID}.txt`, postJSON, (err) => {
            if (err) {
                console.error(err);
            } else {
                res.send(cusID);
            }
        })
    } else {
        cusID = false;
        res.send(cusID);
    }
})

// post request when a user wants to delete customer data. If the selected file exists the file is deleted, but if the file does not exist a response is sent back to the user informing them there was an error deleting the customer data
app.post('/customer/data/delete', (req, res) => {
    let postBody = req.body;
    let cusID = postBody.customerID;
    if (fs.existsSync(`./data/${cusID}.txt`)) {
        fs.unlink(`./data/${cusID}.txt`, (err) => {
            if (err) {
                console.error(err);
            } else {
                res.send(cusID);
            }
        })
    } else {
        cusID = false;
        res.send(cusID);
    }
})

// post request when the user wants to find information for a selected customer ID they provide. If the file exists the customer information is returned back to the client so it can be input into the correct fields. If the file does not exist a response is returned informing the user that no customer data could be found
app.post('/customer/data/find', (req, res) => {
    let postBody = req.body;
    let cusID = postBody.customerID;
    if (fs.existsSync(`./data/${cusID}.txt`)) {
        fs.readFile(`./data/${cusID}.txt`, {encoding: 'utf8'}, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                res.send(data);
            }
        }) 
    } else {
        data = false;
        res.send(data);
    }
})