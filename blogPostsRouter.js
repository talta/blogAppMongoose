
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('/body-parser');
const jsonParser = bodyParser.json();


mongoose.Promise = global.Promise;

const {BlogPosts} = require('./models');

const app = express();



app.get('/posts', (req, res) => {
	BlogPosts
	.find()
	.limit(10)
	.exec()
	.then(BlogPosts => {
		res.json({
			blogPosts: blogPosts.map(
				(blogPosts) => blogPosts.apiRepr());
		});
	})
	.catch(
		err => {
			console.log(error);
			res.status(500).json({message: 'Internal Sever Error'});
		});
});


app.get('/posts/:id', (req, res) =>{
	BlogPosts 
		.findById(req.params.id)
		.exec
		.then(restaurant => res.json(restaurant.apiRepr()))
		.catch(err => {
			console.log(err);
			res.status(500).json({message: 'Internal Server Error'});
		});
});

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
	BlogPosts
		.create({
			id: req.params.id,
			title: req.body.title,
			content: req.body.content,
			author: req.body.author,
			publishDate: req.body.publishDate
		})
		.then(
			blogPosts => res.status(201).json(blogPosts.apiRepr())
		.catch(err => {
			console.log(err);
			res.status(500).json({message: 'Internal Server Error'});
		});
});

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
	const toUpdate = {};
	const updatableFields = ['title', 'content', 'author', 'publishDate'];

	updatableFields.forEach(field => {
		if(field in req.body){
			toUpdate[field] =rep.body.field
		}
	});
	BlogPosts
	.findIdAndUpdate(req.params.id, {$set: toUpdate});
	.exec()
	.then(blogPosts => res.status(204).end())
	.catch(err => res.status(500).json({message: 'Internal Server Error'}));
})

app.delete('/posts:id', (req, res) => {
	BlogPosts
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(restaurant => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal Server Error'}));

	// BlogPosts.delete(req.params.id);
	// console.log(`deleting the \`${req.params.id}.`)
	// res.status(204).end();
})




