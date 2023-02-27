const buffer = require('smart-buffer').SmartBuffer;

class byteReader {
    readString (buf) {
        return buf.readString(buf.readUInt8());
    }
    readStringW (buf) {
        return buf.readString(buf.readUInt8() * 4, 'UTF-16LE').replace(/\u0000/gi, '');
    }
    writeStringW (str) {
        str = ('' + str).slice(0, 255);
        const packet = buffer.fromSize((str.length * 4) + 1);
        packet.writeUInt8(str.length, 0);
        packet.writeString(str.split('').join('\u0000') + '\u0000', 1, 'UTF-16LE');
        return packet.toBuffer();
    }
}

class vector3f {
    constructor (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    toString () {
        return `[${this.x}, ${this.y}, ${this.z}]`;
    }
}

module.exports = {
    vector3f: vector3f,
    byteReader: byteReader,
    error: {
        eventNotFound: class eventNotFound extends Error {
            constructor(message) {
                super(message);
                this.name = 'eventNotFound';
            }
        }
    }
};