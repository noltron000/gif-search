// REQUIREMENTS FIRST
var exphbs	= require('express-handlebars');
var express = require('express');
var http = require('http');
var giphy = require('giphy-api')();

// MISC DECLARATIONS SECOND
var app = express();

// APP.MISC THINGS
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// APP.GET THINGS

// REFACTORED CODE
app.get('/', function (req, res) {
	var queryString = "funny cat";
	if (req.query.term != "" && req.query.term != undefined && req.query.term != null) {
		queryString = req.query.term.toString();
	};
	giphy.search(queryString, function (err, response) {
		res.render('home', {gifs: response.data})
	});
});

/* ORIGINAL CODE
app.get('/', function (req, res) {

	// IF NOTHING IS ENTERED THEN DEFAULT FUNNY CATS ELSE KEEP ENTRY TERM
	var queryString = "funny cat";
	if (req.query.term != "" && req.query.term != undefined) {
		queryString = req.query.term;
	};

	// ENCODE THE QUERY STRING TO REMOVE WHITE SPACES AND RESTRICTED CHARACTERS
	var term = encodeURIComponent(queryString);

	// PUT THE SEARCH TERM INTO THE GIPHY API SEARCH URL
	var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'
	http.get(url, function(response) {

		// SET ENCODING OF RESPONSE TO UTF8
		response.setEncoding('utf8');
		var body = '';
		response.on('data', function(d) {

			// CONTINUOUSLY UPDATE STREAM WITH DATA FROM GIPHY
			body += d;
		});

		response.on('end', function() {

			// WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
			var parsed = JSON.parse(body);

			// RENDER THE HOME TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
			res.render('home', {gifs: parsed.data})
		});
	});
});
*/

// this allows heroku to determine the port
const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Example app listening on port 3000!\nhttp://localhost:${port}/`);
});

app.get('/hello-world', function (req, res) {
	res.send('Hello World!');
});

app.get('/hello-gif', function (req, res) {
	var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
	res.render('hello-gif', {gifUrl: gifUrl})
});

app.get('/greetings/:name', function (req, res) {
	var name = req.params.name;
	res.render('greetings', {name: name});
});
