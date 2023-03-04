Protocols
=============
Protocol List
-------------
```js
const server = require('acserver-plugin');

console.log(server.PROTOCOLS);
```
Expected output:
```
{
  NEW_SESSION: 50,      
  NEW_CONNECTION: 51,   
  CONNECTION_CLOSED: 52,
  CAR_UPDATE: 53,       
  CAR_INFO: 54,
  END_SESSION: 55,
  LAP_COMPLETED: 73,
  VERSION: 56,
  CHAT: 57,
  CLIENT_LOADED: 58,
  SESSION_INFO: 59,
  ERROR: 60,
  CLIENT_EVENT: 130,
  CE_COLLISION_WITH_CAR: 10,
  CE_COLLISION_WITH_ENV: 11,
  REALTIMEPOS_INTERVAL: 200,
  GET_CAR_INFO: 201,
  SEND_CHAT: 202,
  BROADCAST_CHAT: 203,
  GET_SESSION_INFO: 204,
  SET_SESSION_INFO: 205,
  KICK_USER: 206,
  NEXT_SESSION: 207,
  RESTART_SESSION: 208,
  ADMIN_COMMAND: 209
}
```

Detailed Description
-------------
###### PROTOCOLS.NEW_SESSION
* Triggered when new session is created
* Data format: same to `PROTOCOLS.SESSION_INFO`

###### PROTOCOLS.NEW_CONNECTION
* Triggered when someone tries to connect the server
* Data format: driver's name, driver's guid, car id, car model, car skin
  `[String, String, Number, String, String]`

###### PROTOCOLS.CONNECTION_CLOSED
* Triggered when someone left the server
* Data format: driver's name, driver's guid, car id, car model, car skin
  `[String, String, Number, String, String]`

###### PROTOCOLS.CAR_UPDATE
* Triggered when the server receives car realtime updates
* Only received when the server enabled realtime report
* Data format: car id, position, velocity, gear, rpm, normalized spline force (Actually I have no idea what this is)
  `[Number, server.vector3f, server.vector3f, Number, Number, Number]`

###### PROTOCOLS.CAR_INFO
* Triggered when the server sent car information.
* Only received after `app.getCarInfo()` was called
* Data format: car id, if connected, car model, car skin, driver's name, driver's team, driver's guid
  `[Number, Boolean, String, String, String, String, String]`

###### PROTOCOLS.END_SESSION
* Triggered when current session ended
* Data format: session report file's route
  `[String]`

###### PROTOCOLS.LAP_COMPLETED
* Triggered when a player completed the lap
* The data in `{}` below is repeated as much as the number of cars on leaderboard
* The unit of `laptime` is milliseconds
* Data format: car id, laptime, cuts, the number of cars on leaderboard, {car id, laptime, laps, if completed}, grip level
  `[Number, Number, Number, Number, {Number, Number, Number, Boolean}, Number]`

###### PROTOCOLS.VERSION
* Triggered when startup
* Shows UDP plugin protocol version
* Data format: version
  `[Number]`

###### PROTOCOLS.CHAT
* Triggered when a player sent a chat
* Data format: car id, message
  `[Number, String]`

###### PROTOCOLS.CLIENT_LOADED
* Triggered when a player was completely loaded (follows after `PROTOCOLS.NEW_CONNECTION`)
* Data format: car id
  `[Number]`

###### PROTOCOLS.SESSION_INFO
* Triggered when the server sent session information
* Only received after `app.getSessionInfo()` was called
* The unit of `time from session's start` is milliseconds
* Session type: 1 practice, 2 qualify, 3 race
* Data format: udp protocol version, the index of requested session, the index of current session, the number of sessions in the server, server name, track name, track config, session name, session type, session time, session laps, wait time, ambient temperature, road temperature, weather graphics, time from session's start
  `[Number, Number, Number, Number, String, String, String, String, String, Number, Number, Number, Number, Number, Number, String, Number]`

###### PROTOCOLS.ERROR
* Triggered when server got an error (Not certain and might be wrong)
* Data format: error message
  `[String]`

###### PROTOCOLS.CLIENT_EVENT
* Triggered when player collided with something
* `Type` can be either `PROTOCOL.CE_COLLISION_WITH_CAR` or `PROTOCOL.CE_COLLISION_WITH_ENV`
* `Other car id` is included when `type` is `PROTOCOL.CE_COLLISION_WITH_CAR`
* Data format: type, car id, (other car id), speed, world position, car's relative position
  `[Number, Number, (Number), Number, server.vector3f, server.vector3f]`