var debug = require('debug')('wol:leaderboard');

/* interpret packet and structure match object for easier use */
module.exports = function parse(game, match) {
    /* fail if we're somehow missing players */
    if (!match.players || match.players.length < 1) return;

    /* normalize nicks and remove useless entries */
    var players = [];
    match.players.forEach(function(player, index) {
        /* do nothing with spectators */
        if (player.spc && player.spc > 0) {
            return;
        }

        /* typically Computer */
        if (!player.nam) {
            player.nam = 'Computer'; // stylized (CaMeLcAsE)
        }

        /* lowercase username for further reference */
        player.name = player.nam.toLowerCase();

        /* keep sanitized player */
        players.push(player);
    });

    /* reassign players to keep */
    match.players = players;

    /* if we have ra stats, normalize packet then carry on  */
    if (game == 'ra' || game == 'am') {
        match = require(global.cwd + '/lib/games/lib/ra').normalize(match);
    }

    /* if we have td stats, normalize packet then carry on  */
    if (game == 'td') {
        match = require(global.cwd + '/lib/games/lib/td').normalize(match);
    }

    /* determine win/loss outcome for each player */
    match.players.forEach(function(player) {
        player.won = 0;
        player.loss = 0;
        player.discon = 0;

        /* shortcut: if player lost connection */
        if (player.lcn && player.lcn > 0) {
            player.discon = 1;
        }

        /* evaluate completions */
        if (player.cmp) {
            switch (player.cmp) {
                case 2:
                    player.loss = 1;
                    player.discon = 1;
                    break;

                case 256:
                    player.won = 1;
                    break;

                case 512: /* resigned */
                case 528: /* defeated */
                    player.loss = 1;
                    break;
            }
        }

        /* remove unused info */
        delete player.ipa; /* could be tunnel or p2p (unreliable) */
        delete player.adr; /* same reason but for ra1 */
        delete player.ser; /* serials are not used on CnCNet */
    });

    return match;
};
