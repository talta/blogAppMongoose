
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('/body-parser');
const jsonParser = bodyParser.json();


mongoose.Promise = global.Promise;

const {BlogPosts} = require('./models');

const app = express();



app.get('/posts', (req, res) => {

})


app.get('/posts/:id', (req, res) =>{

})

app.post('/posts', (req, res) =>{

})

app.post('/posts', (req, res) =>{

})

app.put('/posts/:id', (req, res) =>{

})

app.delete('/posts:id', (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for(i = 0; i<requiredFields.length; i++){
		const field = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing \`${field}\` missing from the input.`
			console.error(message);
			return res.status(400).send(message);
		}
	}





	}
})