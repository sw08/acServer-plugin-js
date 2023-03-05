const protocols = require('./protocols');

const query = {};

query[protocols.NEW_CONNECTION] = [['strw', 2], 'uint8', ['str', 2]];
query[protocols.CONNECTION_CLOSED] = query[protocols.NEW_CONNECTION];
query[protocols.CAR_UPDATE] = ['uint8', ['v3f', 2], 'uint8', 'uint16', 'f'];
query[protocols.CAR_INFO] = [['uint8', 2], ['strw', 5]];
query[protocols.END_SESSION] = ['strw'];
query[protocols.LAP_COMPLETED] = ['uint8', 'uint32', 'uint8'];
query[protocols.VERSION] = ['uint8'];
query[protocols.CHAT] = ['uint8', 'strw'];
query[protocols.CLIENT_LOADED] = ['uint8'];
query[protocols.SESSION_INFO] = [['uint8', 4], 'strw', ['str', 3], 'uint8', ['uint16', 3], ['uint8', 2], 'str', 'int32'];
query[protocols.ERROR] = ['strw'];
query[protocols.CLIENT_EVENT] = [['uint8', 2]];
query[protocols.NEW_SESSION] = query[protocols.SESSION_INFO];

const params = {};

params[protocols.NEW_CONNECTION] = 'name/guid/car_id/model/skin'
params[protocols.CONNECTION_CLOSED] = params[protocols.NEW_CONNECTION];
params[protocols.CAR_UPDATE] = 'car_id/position/velocity/gear/rpm/nomalized_spline_pos';
params[protocols.CAR_INFO] = 'car_id/connected/model/skin/name/team/guid';
params[protocols.END_SESSION] = 'filename';
params[protocols.LAP_COMPLETED] = 'car_id/laptime/cuts';
params[protocols.VERSION] = 'version';
params[protocols.CHAT] = 'car_id/message';
params[protocols.CLIENT_LOADED] = 'car_id';
params[protocols.SESSION_INFO] = 'version/sess_index/current_sess_index/sess_count/server_name/track/track_config/name/type/time/laps/wait_time/ambient_temp/road_temp/weather/elapsed_time';
params[protocols.ERROR] = 'message';
params[protocols.CLIENT_EVENT] = 'type/car_id'
params[protocols.NEW_SESSION] = params[protocols.SESSION_INFO];

for (const key of Object.keys(params)) params[key] = params[key].split('/')

module.exports = {query: query, params: params};
