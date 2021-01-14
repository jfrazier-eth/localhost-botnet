const getPort = require('get-port');
const open = require("open");
const express = require('express');

const initializeVictim = require("./victim/server/index").initialize;
const initializeDownload = require("./download/server/index").initialize;
const initializeCommand = require("./command/server/index").initialize;


(async function() {
    const victimPort = await getPort({ port: 3002 });
    if (victimPort != 3002) {
        console.error(
            "Error: Port 3002 unavaiable."
        );
        return;
    }
    const commandPort = await getPort({ port: 3001 });
    if (commandPort != 3001) {
        console.error(
            "Error: Port 3001 unavaiable."
        );
        return;
    }
    const downloadPort = await getPort({ port: 8000 }); //find an availble port (default 8000)

    await initializeCommand(commandPort, express);
    await initializeDownload(downloadPort, express);
    await initializeVictim(victimPort, express);

    open(`http://127.0.0.1:${victimPort}/login`)
        .then(() => {
            console.log("login opened");
        }).catch(err => console.error(err));

    open(`http://127.0.0.1:${commandPort}/command`)
        .then(() => {
            console.log("command opened");
        }).catch(err => console.error(err));

    open(`http://127.0.0.1:${downloadPort}/`)
        .then(() => {
            console.log("download opened");
        }).catch(err => console.error(err));
})();