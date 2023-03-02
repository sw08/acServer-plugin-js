Docs
==============

Index
--------------
* Basic forms
* [Event Protocols](https://github.com/sw08/acServer-plugin-js/tree/main/docs/protocols.md)
  

Basic forms
--------------
```js
const server = require('acserver-plugin');
const app = new server.PluginApp({
    port: 12000, // port #1
    hostname: '127.0.0.1' // hostname
});
const port = 12001; // port #2

app.run(port);
```

![Port image](../imgs/port_example.png)

This is the minimum code of this server.
But you can't do anything but turning on with this code.
So you should customize your plugin by adding listeners in this, with `app.on(protocol, callback)`.

```js
...

app.on(server.PROTOCOLS.CLIENT_LOADED, (data) => {
    console.log(data);
});

...
```
If protocol you wrote does not exist, it will throw `server.errors.eventNotFound` error.