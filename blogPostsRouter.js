
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('/body-parser');
const jsonParser = bodyParser.json();


mongoose.Promise = global.Promise;

const {BlogPosts} = require('./models');

const app = express();



app.get('/posts', (req, res) => {
	res.json(BlogPosts.get());
})


app.get('/posts/:id', (req, res) =>{
	res.json(BlogPosts[id].get());
})

app.post('/posts', (req, res) =>{
	const requiredFields = ['title', 'content', 'author'];
	for(i = 0; i<requiredFields.length; i++){
		const field = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing \`${field}\` missing from the input.`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const  post  = BlogPosts.create(req.body.title, req.body.content, req.body.author);
	res.status(201).json(post);
})

app.put('/posts/:id', (req, res) =>{
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for(i = 0; i<requiredFields.length; i++){
		const field = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing \`${field}\` missing from the input.`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	if(req.params.id !== req.body.id){
		const message = `id of \`${req.params.id}\` is not the same as existing ID in \`${req.body.id}\`.`
		console.log(message);
		return res.status(400).send(message);
	}
	console.log(`updating the \`${req.params.id} blog post.`);
	const updatedPost = BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate
	});
	res.status(204).json(updatedPost);
})

app.delete('/posts:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`deleting the \`${req.params.id}.`)
	res.status(204).end();
})




