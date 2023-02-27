acServer-plugin-js
=============

A node.js wrapper that enables people to make Assetto Corsa multiplayer server plugin easily.

### Key Features
* Support for all the features available in official C# example

### Installing
```
> npm install --save acserver-plugin
```

### Quick Example
```js
const server = require('acserver-plugin');
const app = new server.PluginApp();

app.on(server.PROTOCOLS.NEW_SESSION, (data) => {
    console.log('New Session');
    console.log(data);
});

app.on(server.PROTOCOLS.CHAT, (data) => {
    app.getCarInfo(data[0]);
    if (data[1] === '!kick me') {
        app.kick(data[0]);
    }
});

app.on(server.PROTOCOLS.CAR_INFO, (data) => {
    console.log(data);
})

app.run(12001);
```

[More Examples](https://github.com/sw08/acServer-plugin-js/tree/main/examples)

### License
This project is licensed under the [GPL 3.0 License](https://github.com/sw08/acServer-plugin-js/blob/main/LICENSE).

### Links
* [Documentation](https://github.com/sw08/acServer-plugin-js/tree/main/docs)
* [NPM](https://www.npmjs.com/package/acserver-plugin)