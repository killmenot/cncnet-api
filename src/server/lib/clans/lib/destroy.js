var debug = require('debug')('wol:leaderboard');
var $db = require(global.cwd + '/lib/mongo');
var _sanitize = require(global.cwd + '/lib/player/lib/sanitize');
var $q = require('q');

module.exports = function(game, clan, player) {
    return new Promise(function(resolve, reject) {
        var $clans = $db.get(game +'_clans');
        var $players = $db.get(game +'_players');

        clan = clan.toLowerCase();
        player = player.toLowerCase();

        // ensure user is in clan (player object)
        $players.findOne({name: _sanitize(player, true)}, function(err, player_data) {
            // player not in a clan or not in clan specified
            if (!player_data.clan || player_data.clan.toLowerCase() !== clan) return reject();

            $clans.findOne({name: _sanitize(clan, true)}, function(err, clan_data) {
                if (!clan_data) return reject(); // clan doesn't exist

                // double check that player is in clan
                if (clan_data.members.indexOf(player) < 0) return reject();

                // ensure user if clan founder (clan object)
                if (clan_data.founder !== player) return reject();

                // delete clan
                $clans.remove({name: _sanitize(clan, true)}).success(function() {

                    // remove all players from clan
                    clan_data.members.forEach(function(member) {
                        $players.update({name: _sanitize(member, true)}, {
                            $unset: {
                                clan: ''
                            }
                        });
                    });

                    return resolve();
                });
            });
        });
    });
};
