const udp = require('dgram');
const buffer = require('smart-buffer').SmartBuffer;
const tools = require('./tools');
const protocols = require('./protocols');
const execute_query = require('./query');
const { platform } = require('os');


function parseQuery(query) {
    const data = [];
    for (var i = 0; i < query.length; i++) {
        const q = typeof q === 'string' ? [q, 1] : query[i];
        for (var i = 0; i < q[1]; i++) {
            switch (q[0]) {
                case 'v3f':
                    data.push(new tools.vector3f(buf.readFloatLE(), buf.readFloatLE(), buf.readFloatLE()));
                    break;
                case 'f':
                    data.push(buf.readFloatLE());
                    break;
                case 'int32':
                    data.push(buf.readInt32LE());
                    break;
                case 'uint32':
                    data.push(buf.readUInt32LE());
                    break;
                case 'uint16':
                    data.push(buf.readUInt16());
                    break;
                case 'uint8':
                    data.push(buf.readUInt8());
                    break;
                case 'strw':
                    data.push(br.readStringW(buf));
                    break;
                case 'str':
                    data.push(br.readString(buf));
                    break;
            }
        }
    }
    return data;
}

function main (msg, info) {
    const buf = buffer.fromBuffer(msg);
    const cmd = buf.readUInt8();
    const command = this.listeners[cmd];
    if (command === undefined) return;
    const data = parseQuery(execute_query[cmd]);
    if (cmd === protocols.LAP_COMPLETED) {
        for (var i = 0; i < buffer.readUInt8(); i++) {
            data.push(buf.readUInt8());
            data.push(buf.ReadUInt32());
            data.push(buf.ReadUInt16());
            data.push(buf.readUInt8());
        }
        data.push(buf.readFloatLE());
    } else if (cmd === protocols.CLIENT_EVENT && data[0] === protocols.CE_COLLISION_WITH_CAR) {
        data.push(buf.readUInt8());
        data.push(buf.readFloatLE());
        data.push(new tools.vector3f(buf.readFloatLE(), buf.readFloatLE(), buf.readFloatLE()));
        data.push(new tools.vector3f(buf.readFloatLE(), buf.readFloatLE(), buf.readFloatLE()));
    }
    command(data);
}


class PluginApp {
    constructor (config={}) {
        this.config = {
            get_leaderboard: false
        };
        for (const key of Object.keys(config)) {
            this.config[key] = config[key];
        }
        this.br = new tools.byteReader();
        this.client = udp.createSocket('udp4');
        this.listeners = {};
    }
    run (port) {
        this.client.on('message', main);
        this.client.bind(port);
    }
    on (event, callback) {
        if (!protocols.includes(event)) throw new tools.error.eventNotFound('There is no such event');
        this.listeners[event] = callback;
    }
}

module.exports = {
    PluginApp: PluginApp
}