const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.promise  = global.Promise;


const blogPostsRouter = require('./blogPostsRouter.js');
const app = express();

const {PORT, DATABASE_URL} = require('./config');
const {Post} = require('./models');




app.use(bodyParser.json);

// you need to import `blogPostsRouter` router and route
// requests to HTTP requests to `/blog-posts` to `blogPostsRouter`

app.use('/blog-Posts', blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});


app.use('*', function(req, res) {
	res.status(400).send('request not found');
});


let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT){
	return new Promise((resolve, reject) =>{
		mongoose.connect(databaseUrl, err => {
			if(err){
				return reject(err);
			}
			app.listen(port,() => {
				console.log(`Your app is listening on port ${port}`);
				resolve();
			})
			.on('error', rr => {
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}

function closeServer(){
	return mongoose.disconnect().then(() =>{
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if(err){
					return reject(err);
				}
				resolve();
			});
		});
	});
}


if(require.main === module){
	runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
