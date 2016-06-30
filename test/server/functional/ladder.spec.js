var fs = require('fs');
var request = require('request');
var MATCH_DELAY = parseInt(process.env.MATCH_DELAY) + 50;

describe('Ladder Endpoints', function() {
    it('YR Regular match: 2 packets', function(done) {
        var xmexyou = fs.readFileSync(scenarios + '/YR_REGULAR_PLAYER_2');
        var nemesis = fs.readFileSync(scenarios + '/YR_REGULAR_PLAYER_1');

        var options = {
            method: 'POST',
            url: url + '/ladder/yr',
            body: xmexyou.toString(),
            headers: {
                'content-type': 'text/plain',
                authorization: 'Basic dGFoajpwYXNzd29yZA=='
            }
        };

        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        options.body = nemesis.toString();
        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        setTimeout(function() {
            request({url: url + '/ladder/yr/player/nemesis'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(1);
                expect(body.losses).to.equal(0);
                expect(body.disconnects).to.equal(0);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(1016);

            });

            request({url: url + '/ladder/yr/player/xmexyou'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(0);
                expect(body.losses).to.equal(1);
                expect(body.disconnects).to.equal(0);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(984);
                done();
            });
        }, MATCH_DELAY);
    });

    it('RA Regular match: 2 packets', function(done) {
        var robskate = fs.readFileSync(scenarios + '/RA_REGULAR_PLAYER_2');
        var fattynoob = fs.readFileSync(scenarios + '/RA_REGULAR_PLAYER_1');

        var options = {
            method: 'POST',
            url: url + '/ladder/ra',
            body: robskate.toString(),
            headers: {
                'content-type': 'text/plain',
                authorization: 'Basic dGFoajpwYXNzd29yZA=='
            }
        };

        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        options.body = fattynoob.toString();
        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        setTimeout(function() {
            request({url: url + '/ladder/ra/player/fattynoob'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(0);
                expect(body.losses).to.equal(1);
                expect(body.disconnects).to.equal(0);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(984);
            });

            request({url: url + '/ladder/ra/player/robskate'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(1);
                expect(body.losses).to.equal(0);
                expect(body.disconnects).to.equal(0);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(1016);
                done();
            });
        }, MATCH_DELAY);
    });

    it('TD Regular match: 2 packets', function(done) {
        var einar = fs.readFileSync(scenarios + '/TD_REGULAR_PLAYER_2');
        var kuzumi = fs.readFileSync(scenarios + '/TD_REGULAR_PLAYER_1');

        var options = {
            method: 'POST',
            url: url + '/ladder/td',
            body: einar.toString(),
            headers: {
                'content-type': 'text/plain',
                authorization: 'Basic dGFoajpwYXNzd29yZA=='
            }
        };

        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        options.body = kuzumi.toString();
        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        setTimeout(function() {
            request({url: url + '/ladder/td/player/einar'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(1);
                expect(body.losses).to.equal(0);
                expect(body.disconnects).to.equal(0);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(1016);
            });

            request({url: url + '/ladder/td/player/kuzumi'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(0);
                expect(body.losses).to.equal(1);
                expect(body.disconnects).to.equal(1);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(984);
                done();
            });
        }, MATCH_DELAY);
    });

    it('TS Regular (mod map) match: 2 packets', function(done) {
        var gameranger = fs.readFileSync(scenarios + '/TS_REGULAR_PLAYER_2');
        var kaizen = fs.readFileSync(scenarios + '/TS_REGULAR_PLAYER_1');

        var options = {
            method: 'POST',
            url: url + '/ladder/ts',
            body: gameranger.toString(),
            headers: {
                'content-type': 'text/plain',
                authorization: 'Basic dGFoajpwYXNzd29yZA=='
            }
        };

        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        options.body = kaizen.toString();
        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        setTimeout(function() {
            request({url: url + '/ladder/tsm/player/gameranger'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(0);
                expect(body.losses).to.equal(1);
                expect(body.disconnects).to.equal(0);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(984);
            });

            request({url: url + '/ladder/tsm/player/kaizen'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(1);
                expect(body.losses).to.equal(0);
                expect(body.disconnects).to.equal(0);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(1016);
                done();
            });
        }, MATCH_DELAY);
    });

    it('TS D/C Scenario: 1 packet declare uploader winner', function(done) {
        var results = fs.readFileSync(scenarios + '/TS_DISCONNECT_PLAYER_1');

        var options = {
            method: 'POST',
            url: url + '/ladder/ts',
            body: results.toString(),
            headers: {
                'content-type': 'text/plain',
                authorization: 'Basic dGFoajpwYXNzd29yZA=='
            }
        };

        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        setTimeout(function() {
            request({url: url + '/ladder/ts/player/xy'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(0);
                expect(body.losses).to.equal(1);
                expect(body.disconnects).to.equal(1);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(984);
            });

            request({url: url + '/ladder/ts/player/test2'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(1);
                expect(body.losses).to.equal(0);
                expect(body.disconnects).to.equal(0);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(1016);
                done();
            });
        }, MATCH_DELAY);
    });

    it('TS Conflicting packets: consider match out of sync', function(done) {
        var wolfhound = fs.readFileSync(scenarios + '/TS_CONFLICT_PLAYER_2');
        var puzzibaer = fs.readFileSync(scenarios + '/TS_CONFLICT_PLAYER_1');

        var options = {
            method: 'POST',
            url: url + '/ladder/ts',
            body: wolfhound.toString(),
            headers: {
                'content-type': 'text/plain',
                authorization: 'Basic dGFoajpwYXNzd29yZA=='
            }
        };

        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        options.body = puzzibaer.toString();
        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        setTimeout(function() {
            request({url: url + '/ladder/ts/player/puzzibaer'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(0);
                expect(body.losses).to.equal(0);
                expect(body.disconnects).to.equal(0);
                expect(body.oos).to.equal(1);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(1000);
            });

            request({url: url + '/ladder/ts/player/wolfhound'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(0);
                expect(body.losses).to.equal(0);
                expect(body.disconnects).to.equal(0);
                expect(body.oos).to.equal(1);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(1000);
                done();
            });
        }, MATCH_DELAY);
    });

    it('TS match hadn\'t started: consider match out of sync', function(done) {
        var game = fs.readFileSync(scenarios + '/TS_CONFLICT_GAME_2'); // 5546451

        var options = {
            method: 'POST',
            url: url + '/ladder/ts',
            body: game.toString(),
            headers: {
                'content-type': 'text/plain',
                authorization: 'Basic dGFoajpwYXNzd29yZA=='
            }
        };

        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        setTimeout(function() {
            request({url: url + '/ladder/ts/game/5546451'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);

                // console.dir(body);
                expect(body.oosy).to.equal(1);
                done();
            });
        }, MATCH_DELAY);
    });

    it('RA Draw Scenario: both winners without point allocation', function(done) {
        var oracroboys = fs.readFileSync(scenarios + '/RA_DRAW_PLAYER_2');
        var rc2g2g = fs.readFileSync(scenarios + '/RA_DRAW_PLAYER_1');

        var options = {
            method: 'POST',
            url: url + '/ladder/ra',
            body: oracroboys.toString(),
            headers: {
                'content-type': 'text/plain',
                authorization: 'Basic dGFoajpwYXNzd29yZA=='
            }
        };

        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        options.body = rc2g2g.toString();
        request(options, function(err, res) {
            expect(res.statusCode).to.equal(202);
        });

        setTimeout(function() {
            request({url: url + '/ladder/ra/player/ora-croboys'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(1);
                expect(body.losses).to.equal(0);
                expect(body.disconnects).to.equal(0);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(1000);
            });

            request({url: url + '/ladder/ra/player/rc_2g2g'}, function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.wins).to.equal(1);
                expect(body.losses).to.equal(0);
                expect(body.disconnects).to.equal(0);
                expect(body.games.length).to.equal(1);
                expect(body.points).to.equal(1000);
                done();
            });
        }, MATCH_DELAY);
    });

    it('24 hour limit for games played vs. same opponent', function(done) {
        // southvibe vs. microsoft
        var game1 = fs.readFileSync(scenarios + '/TS_LIMIT_GAME_1'); // 1159091692
        var game2 = fs.readFileSync(scenarios + '/TS_LIMIT_GAME_2'); // 1159087596
        var game3 = fs.readFileSync(scenarios + '/TS_LIMIT_GAME_3'); // 1159083500
        var game4 = fs.readFileSync(scenarios + '/TS_LIMIT_GAME_4'); // 1159079404

        var options = {
            method: 'POST',
            url: url + '/ladder/ts',
            headers: {
                'content-type': 'text/plain',
                authorization: 'Basic dGFoajpwYXNzd29yZA=='
            }
        };

        options.body = game1.toString();
        request(options, function() {});

        setTimeout(function() {
            options.body = game2.toString();
            request(options, function(){});
        }, MATCH_DELAY + 3)

        setTimeout(function() {
            options.body = game3.toString();
            request(options, function(){});
        }, MATCH_DELAY + 7)

        setTimeout(function() {
            options.body = game4.toString();
            request(options, function(){});

            setTimeout(function() {
                request({url: url + '/ladder/ts/game/1159091692'}, function(err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    body = JSON.parse(body);
                    expect(body.quota).to.equal(false);
                    expect(body.players[0].exp).to.exist;
                });

                request({url: url + '/ladder/ts/game/1159087596'}, function(err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    body = JSON.parse(body);
                    expect(body.quota).to.equal(false);
                    expect(body.players[0].exp).to.exist;
                });

                request({url: url + '/ladder/ts/game/1159083500'}, function(err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    body = JSON.parse(body);
                    expect(body.quota).to.equal(false);
                    expect(body.players[0].exp).to.exist;
                });

                request({url: url + '/ladder/ts/game/1159079404'}, function(err, res, body) {
                    expect(res.statusCode).to.equal(200);
                    body = JSON.parse(body);
                    expect(body.quota).to.equal(true);
                    expect(body.players[0].exp).to.be.undefined;
                    done();
                });
            }, MATCH_DELAY + 3);
        }, MATCH_DELAY + 15);
    });

    it('TS leaderboard (official) for players', function(done) {
        /* warm up cache */
        request(url + '/ladder/ts', function() {});

        /* actual results */
        setTimeout(function() {
            request(url + '/ladder/ts', function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.length).to.equal(6);
                done();
            });
        }, MATCH_DELAY);
    });

    it('TS leaderboard (mod map) for players', function(done) {
        /* warm up cache */
        request(url + '/ladder/tsm', function() {});

        /* actual results */
        setTimeout(function() {
            request(url + '/ladder/tsm', function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.length).to.equal(2);
                done();
            });
        }, MATCH_DELAY);
    });

    it('RA leaderboard for players', function(done) {
        /* warm up cache */
        request(url + '/ladder/ra', function() {});

        /* actual results */
        setTimeout(function() {
            request(url + '/ladder/ra', function(err, res, body) {
                expect(res.statusCode).to.equal(200);
                body = JSON.parse(body);
                expect(body.length).to.equal(4);
                done();
            });
        }, MATCH_DELAY);
    });

    it('should shorten results if limit query param passed', function(done) {
        request(url + '/ladder/ts?limit=2', function(err, res, body) {
            expect(res.statusCode).to.equal(200);
            body = JSON.parse(body);
            expect(body.length).to.equal(2);
            done();
        });
    });

});
