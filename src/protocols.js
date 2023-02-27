module.exports = {
    NEW_SESSION: 50,
    NEW_CONNECTION: 51,
    CONNECTION_CLOSED: 52,
    CAR_UPDATE: 53,
    CAR_INFO: 54, // Sent as response to GET_CAR_INFO command;
    END_SESSION: 55,
    LAP_COMPLETED: 73,
    VERSION: 56,
    CHAT: 57,
    CLIENT_LOADED: 58,
    SESSION_INFO: 59,
    ERROR: 60,
    // EVENTS;
    CLIENT_EVENT: 130,
    // EVENT TYPES;
    CE_COLLISION_WITH_CAR: 10,
    CE_COLLISION_WITH_ENV: 11,
    // COMMANDS;
    REALTIMEPOS_INTERVAL: 200,
    GET_CAR_INFO: 201,
    SEND_CHAT: 202, // Sends chat to one car;
    BROADCAST_CHAT: 203, // Sends chat to everybody;
    GET_SESSION_INFO: 204,
    SET_SESSION_INFO: 205,
    KICK_USER: 206,
    NEXT_SESSION: 207,
    RESTART_SESSION: 208,
    ADMIN_COMMAND: 209, // Send message plus a stringW with the command
}