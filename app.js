var express = require('express');
var gis = require('g-i-s');
var bodyParser = require('body-parser');
var app = express();


var popular = [];
var path = process.cwd();


app.get('/', (req, res) => {
	res.sendFile(path + '/public/html/index.html');
});

app.use(express.static('public'));

app.get('/last', (req, res) => {
 	res.status(200).send(popular);
});


app.set('json spaces', 1);
 
app.use('/:search', (req, res) => {
// var search = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
	var search = req.params.search;

	gis(search, logResults);

	function logResults(error, result) {
  		if (error) {
    		console.log(error);
  					}
  		else {

    		res.status(200).send(result);
  
      	if (search.length > 0 && search !== "/favicon.ico") { 

    		popular.unshift({
                populars: search
                
            });
		}

        if (popular.length > 20) {
            popular.pop();
            console.log (popular);             
           }
    	}    
	}               
});

module.exports = app;

app.set('port', process.env.PORT || 3005);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});






















