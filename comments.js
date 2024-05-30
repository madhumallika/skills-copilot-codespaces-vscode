//create web server 
//create a server 
//create a server 
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const PORT = 3000;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

//get request to get comments from the database
app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../database/comments.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(404).send('Error getting comments');
        } else {
            res.status(200).send(data);
        }
    });
});

//post request to add comments to the database
app.post('/addComment', (req, res) => {
    fs.readFile(path.join(__dirname, '../database/comments.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(404).send('Error adding comment');
        } else {
            let comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile(path.join(__dirname, '../database/comments.json'), JSON.stringify(comments), (err) => {
                if (err) {
                    console.log(err);
                    res.status(404).send('Error adding comment');
                } else {
                    res.status(200).send('Comment added');
                }
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});