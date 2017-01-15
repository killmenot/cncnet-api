var debug = require('debug')('wol:leaderboard'),
    _consolidate = require(__dirname + '/lib/consolidate'),
    _type = require(__dirname + '/lib/type');

/* WOL Game Resolution interpreter */
module.exports = function parse(packet) {
    var buffer = packet;
    if (typeof packet === 'string') {
        // remove any unnecessary whitespace
        packet = packet.replace(/(\r|\n|\r\n|\s+)/gm, '');
        buffer = new Buffer(packet, 'hex');
    }

    var flat = {}, i = 4;
    flat.buffer = buffer;
    var slice = buffer.slice(0, 4),
        bufferLength = slice.readUInt16BE(0);

    while (i < bufferLength) {
        var chunk = buffer.slice(i,  i + 4),
            field = chunk.toString();

        i += 4;

        chunk = buffer.slice(i, i + 8);

        var type = chunk.readUInt16BE(0),
            length = chunk.readUInt16BE(2),
            data = 'Unprocessed Data';

        i += 4;

        var end = i + length >= bufferLength ? bufferLength : i + length;

        if (i <= end) {
            data = _type(type, buffer.slice(i, end));
            length = Math.ceil(length / 4) * 4;
            i += length;
        }

        flat[field] = data;
    }

    return _consolidate(flat);
};
