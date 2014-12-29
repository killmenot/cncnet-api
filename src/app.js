/***
*   Copyright 2014 Sean Wragg <seanwragg@gmail.com>
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*	   http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*/

var restify = require('restify'),
	environment = process.env.NODE_ENV || 'production',
	config = require('./config.json')[environment],
	Packet = require('./lib/Packet.js'),
	_database = require('./lib/Database.js');

var app = restify.createServer();
app.use(restify.bodyParser());

_database.configure(config.database);
_database.connect();

var lids = {}, $lids = lids; // Prefetch lids for faster lookup

_database.query('SELECT lid, abbrev FROM wol_ladders', function(err, data) {
	for (var i = data.length - 1; i >= 0; i--) {
		var row = data[i];
		$lids[row.abbrev] = row.lid;
	}
});

app.get('/ping', function(req, res) {
	res.send('pong');
	res.end();
});

// @TODO: open similar udp listener
app.post('/ladder/:game', function(req, res) {
	var body = req.body, game = req.params.game;

	var _packet = new Packet({
		packet: body, 
		lid: $lids[game]
	});

	_packet.handle(function(response) {
		res.json(response);
	});
});

app.get('/ladder/:game', function(req, res) {
	// return top 250 results for given game
	res.json({test: 1});
});

app.get('/ladder/:game/game/:gameId', function(req, res) {
	// return all data for given gameId
	res.json({test: 2});
});

app.get('/ladder/:game/player/:player', function(req, res) {
	// return all data for given player
	res.json({test: 3});
});

app.listen(config.port, function() {
	console.log('\033[32mSUCCESS!!\033[0m WOL Ladder listening on port:%s', config.port);
	console.log('Control + C to cancel');
});