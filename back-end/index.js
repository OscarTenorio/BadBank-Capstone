var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

	// check if account exists
	dal.find(req.params.email)
		.then((users) => {

			// if user exists, return error message
			if(users.length > 0){
				console.log('User already in exists');
				res.send('User already in exists');    
			}
			else{
				// else create user
				dal.create(req.params.name,req.params.email,req.params.password)
					.then((user) => {
							console.log(user);
							res.send(user);            
					});            
			}

		});
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {
	dal.find(req.params.email)
		.then((user) => {
			// if user exists, check password
			if(user.length > 0){
				if (user[0].password === req.params.password){
						// console.log('SERVER login: user[0].password === req.params.password');
						console.log('SERVER successful Login, user data: ', user[0]);
						res.send(user[0]);
				} else {
					console.log('SERVER login: Login failed: wrong password');
					// console.log('SERVER login: Login failed: user password: ', user[0].password);
					res.send('Login failed: wrong password');
				}
			} else {
				// console.log('SERVER Login failed: user not found');
				res.send('Login failed: user not found');
			}
	}); 
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:type/:name/:email/:amount/:balance/:timestamp', function (req, res) {

    dal.update(
		req.params.type,
		req.params.name,
		req.params.email,
		req.params.amount,
		req.params.balance,
		req.params.timestamp
		)
        .then((response) => {
            console.log("LINE 86 INDEX.JS - Update/Withdraw response: ",response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log('LINE 101 index.js: ', docs);
            res.send(docs);
    });
});

var port = 3001;
app.listen(port);
console.log('Running on port: ' + port);
