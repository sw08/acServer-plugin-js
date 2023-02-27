const protocols = require('./protocols');

const query = {};

query[protocols.NEW_SESSION] = [['uint8', 4], 'strw', ['str', 3], 'uint8', ['uint16', 3], ['uint8', 2], 'str', 'int32'];
query[protocols.NEW_CONNECTION] = [['strw', 2], 'uint8', ['str', 2]];
query[protocols.CONNECTION_CLOSED] = query[protocols.NEW_CONNECTION];
query[protocols.CAR_UPDATE] = ['uint8', ['v3f', 2], 'uint8', 'uint16', 'f'];
query[protocols.CAR_INFO] = [['uint8', 2], ['strw', 5]];
query[protocols.END_SESSION] = ['strw'];
query[protocols.LAP_COMPLETED] = ['uint8', 'uint32', 'uint8'];
query[protocols.VERSION] = ['uint8'];
query[protocols.CHAT] = ['uint8', 'strw'];
query[protocols.CLIENT_LOADED] = ['uint8'];
query[protocols.SESSION_INFO] = query[protocols.NEW_SESSION];
query[protocols.ERROR] = ['strw'];
query[protocols.CLIENT_EVENT] = [['uint8', 2]];

module.exports = query;