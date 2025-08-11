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
#### PROTOCOLS.NEW_SESSION
* Data format is same to `PROTOCOLS.SESSION_INFO`

> Triggered when new session is created.  

#### PROTOCOLS.NEW_CONNECTION
* `name`: driver's nickname / `String`
* `guid`: driver's guid / `String`
* `car_id`: car id / `Number`
* `car_model`: car model / `String`
* `car_skin`: car skin / `String`

> Triggered when someone tries to connect the server.

#### PROTOCOLS.CONNECTION_CLOSED
* Data format is same to `PROTOCOLS.NEW_CONNECTION`

> Triggered when someone left the server.

#### PROTOCOLS.CAR_UPDATE
* `car_id`: car id / `Number`
* `position`: car's position in the track / `server.vector3f`
* `velocity`: car's speed in 3 directions / `server.vector3f`
* `gear`: car's gear / `Number`
* `rpm`: car's rpm / `Number`
* `normalized_spline_pos`: No idea what it is / `Number`

> Triggered when the server receives car realtime updates.  
> Only received when the server enabled realtime report.

#### PROTOCOLS.CAR_INFO
* `car_id`: car id / `Number`
* `conencted`: if the car is connected to the server / ``Boolean``
* `model`: car model / `String`
* `skin`: car skin / `String`
* `name`: driver's nickname / `String`
* `team`: driver's team / `String`
* `guid`: driver's guid / `String`

> Triggered when the server sent car information.  
> Only received after `app.getCarInfo()` was called.

#### PROTOCOLS.END_SESSION
* `filename`: session report file's route / `String`

> Triggered when current session ended.

#### PROTOCOLS.LAP_COMPLETED
* `car_id`: car id / `Number`
* `laptime`: laptime in milliseconds / `Number`
* `cuts`: how many cuts the driver did in the lap / `Number`
* `cars`: all cars in the leaderboard / `Object`  
  example:
  ```js
  {
    '0': {
      time: 140363, // 2:20.363
      laps: 5,
      completed: true,
    },
    '1': {
      time: 142504, // 2:22.504
      laps: 10,
      completed: false,
    },
    ...
  }
  ```
* `grip_level`: track's grip level in percent / `Number`

> Triggered when a player completed the lap.  
> The data in `{}` below is repeated as much as the `Number` of cars on leaderboard.


#### PROTOCOLS.VERSION
* `version`: the udp protocol version / `Number`

> Triggered when startup.  
> Shows UDP plugin protocol version.

#### PROTOCOLS.CHAT
* `car_id`: car id / `Number`
* `message`: chat message content / `String`

> Triggered when a player sent a chat.

#### PROTOCOLS.CLIENT_LOADED
* `car_id`: car id / `Number`

> Triggered when a player was completely loaded (follows after `PROTOCOLS.NEW_CONNECTION`)

#### PROTOCOLS.SESSION_INFO
* `version`: udp protocol version / `Number`
* `sess_index`: index of requested session / `Number`
* `current_sess_index`: index of current session / `Number`
* `sess_count`: the number of sessions in the server / `Number`
* `server_name`: name of the server / `String`
* `track`: name of the track / `String`
* `track_config`: configuration of the track / `String`
* `name`: the name of the session / `String`
* `type`: the type of the session. 1: practice / 2: qualify / 3: race / `Number`
* `time`: limited time of the session in mins / `Number`
* `laps`: the number of limited laps of the session / `Number`
* `wait_time`: time for waiting the later drivers to complete session / `Number`
* `ambient_temp`: ambient temperature / `Number`
* `road_temp`: road temperature / `Number`
* `weather`: weather of the session / `String`
* `elapsed_time`: time from the start in ms. Might be negative for races with `wait_time` / `Number`

> Triggered when the server sent session information.  
> Only received after `app.getSessionInfo()` was called.  
> Session length can be limited by either `time` or `laps`.

#### PROTOCOLS.ERROR
* `message`: error message / `String`

> Triggered when server got an error (Not certain and might be wrong)

#### PROTOCOLS.CLIENT_EVENT
* `type`: type of the accident. Can be either `PROTOCOL.CE_COLLISION_WITH_CAR` or `PROTOCOL.CE_COLLISION_WITH_ENV` / `Number`
* `car_id`: car id who is responsible for the accident / `Number`
* `other_car_id`: car id who was crashed. Undefined if the accident was between driver and environment / `Number`
* `speed`: speed at the moment of the accident / `Number`
* `world_position`: absolute position of the car / `server.vector3f`
* `rel_position`: relative position of the car / `server.vector3f`

> Triggered when player collided with other car or environment.
