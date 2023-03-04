const udp = require('dgram');
const buffer = require('smart-buffer').SmartBuffer;
const tools = require('./tools');
const protocols = require('./protocols');
const execute_query = require('./query');

const br = new tools.byteReader();


class PluginApp {
    constructor (config={}) {
        this.config = {
            hostport: 12000,
            hostname: '127.0.0.1'
        };
        for (const key of Object.keys(config)) {
            this.config[key] = config[key];
        }
        this.client = udp.createSocket('udp4');
        this.listeners = {};
    }
    run (port=12001) {
        this.client.on('message', (msg, info) => {
            const buf = buffer.fromBuffer(msg);
            const cmd = buf.readUInt8();
            const command = this.listeners[String(cmd)];
            if (command === undefined) return;
            const query = execute_query[cmd];
            const data = [];
            var q;
            for (var i = 0; i < query.length; i++) {
                q = (typeof query[i]) === 'string' ? [query[i], 1] : query[i];
                for (var j = 0; j < q[1]; j++) {
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
                            data.push(buf.readUInt16BE());
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
            if (cmd === protocols.LAP_COMPLETED) {
                for (var i = 0; i < buffer.readUInt8(); i++) {
                    data.push(buf.readUInt8());
                    data.push(buf.ReadUInt32());
                    data.push(buf.ReadUInt16());
                    data.push(buf.readUInt8() != 0);
                }
                data.push(buf.readFloatLE());
            } else if (cmd === protocols.CLIENT_EVENT && data[0] === protocols.CE_COLLISION_WITH_CAR) {
                data.push(buf.readUInt8());
                data.push(buf.readFloatLE());
                data.push(new tools.vector3f(buf.readFloatLE(), buf.readFloatLE(), buf.readFloatLE()));
                data.push(new tools.vector3f(buf.readFloatLE(), buf.readFloatLE(), buf.readFloatLE()));
            } else if (cmd === protocols.CAR_INFO) {
                data[1] = data[1] != 0;
            }
            command(data);
        });
        this.client.bind(port);
    }
    on (event, callback) {
        if (!Object.values(protocols).includes(event)) throw new tools.error.eventNotFound('There is no such event');
        this.listeners[String(event)] = callback;
    }
    sendPacket (packet) {
        this.client.send(packet.toBuffer(), this.config.hostport, this.config.host);
    }
    broadcastChat (text) {
        const temp = br.writeStringW(text);
        const packet = buffer.fromSize(temp.length + 1);
        packet.writeUInt8(protocols.BROADCAST_CHAT, 0);
        packet.writeBuffer(temp, 1);
        this.sendPacket(packet);
    }
    sendChat (car_id, text) {
        const temp = br.writeStringW(text);
        const packet = buffer.fromSize(temp.length + 2);
        packet.writeUInt8(protocols.SEND_CHAT, 0);
        packet.writeUInt8(car_id, 1);
        packet.writeBuffer(temp, 2);
        this.sendPacket(packet);
    }
    kick (car_id) {
        const packet = buffer.fromSize(2);
        packet.writeUInt8(protocols.KICK_USER, 0);
        packet.writeUInt8(car_id, 1);
        this.sendPacket(packet);
    }
    enableRealtimeReport (interval) {
        const packet = buffer.fromSize(3);
        packet.writeUInt8(protocols.REALTIMEPOS_INTERVAL, 0);
        packet.writeUInt16(interval, 1);
        this.sendPacket(packet);
    }
    getCarInfo (car_id) {
        const packet = buffer.fromSize(2);
        packet.writeUInt8(protocols.GET_CAR_INFO, 0);
        packet.writeUInt8(car_id, 1);
        this.sendPacket(packet);
    }
    getSessionInfo (session_index=-1) {
        const packet = buffer.fromSize(3);
        packet.writeUInt8(protocols.GET_SESSION_INFO, 0);
        packet.writeInt16LE(session_index, 1);
        this.sendPacket(packet);
    }
    setSessionInfo (session_index, name, type, laps, time, wait_time) {
        const temp = br.writeStringW(name);
        const packet = buffer.fromSize(15 + temp.length);
        packet.writeUInt8(protocols.SET_SESSION_INFO, 0);
        packet.writeUInt8(session_index, 1);
        br.writeBuffer(temp, 2);
        packet.writeUInt8(type, 2 + temp.length);
        packet.writeUInt32LE(laps, 3 + temp.length);
        packet.writeUInt32LE(time, 4 + temp.length);
        packet.writeUInt32LE(wait_time, 11 + temp.length);
        this.sendPacket(packet);
    }
}

module.exports = {
    PluginApp: PluginApp,
    PROTOCOLS: protocols,
    errors: {
        eventNotFound: tools.eventNotFound
    }
};