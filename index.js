const express = require('express');
const getPort = require('get-port');
const open = require('open');
const app = express();
const path = require('path');
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

let zombies = [];

const setupCommandAndControl = async() => {
    app.use("/command.js", express.static(path.join(__dirname, "/c-and-c/command.js")));
    const port = await getPort({ port: 3001 });
    const host = `http://127.0.0.1:${port}`;
    if (port != 3001) {
        console.log("ERROR, port 3001 is occupied. Port 3001 is required for this project to run successfully");
        return;
    }
    app.get('/command', function(req, res) {
        res.sendFile(path.join(__dirname, '/c-and-c/command.html'));
    });

    app.use(express.json());
    app.post('/new-victim', function(req, res) {
        const hostname = req.body.host;
        zombies.push(hostname);
        io.emit('new-victim', hostname);
        console.log(`New victim connected, Host: ${hostname}`);
        res.sendStatus(200);
    });

    io.on("connection", (socket) => {
        console.log("command and control socket connection established");
    });

    server.listen(port, async() => {
        await open(`${host}/command`);
    });
    console.log(`Command and control running on port ${port}`);
}

const setupLogin = async() => {
    app.use("/login.js", express.static(path.join(__dirname, "/victim/login.js")));
    app.use("/login.js", express.static(path.join(__dirname, "/victim/login.js")));
    const port = await getPort({ port: 3002 });
    const host = `http://127.0.0.1:${port}`;
    if (port != 3002) {
        console.log("ERROR, port 3002 is occupied. Port 3002 is required for this project to run successfully");
        return;
    }

    app.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname, "/victim/login.html"));
    });

    app.get('/admin.html', function(req, res) {
        res.sendFile(path.join(__dirname, "/victim/admin.html"));
    });


    app.post('/login-attempt', function(req, res) {
        console.log(`Attempt received, ${JSON.stringify(req.body)}`);
        const username = req.body.username;
        const password = req.body.password;
        if (username === "admin" && password == "password") {
            res.redirect("/admin.html");
        } else {
            res.sendStatus(401);
        }
    })

    app.listen(port, async() => {
        await open(`${host}/login`);
    });

    console.log(`Victim running on port ${port}`);
}

(async function() {
    const port = await getPort({ port: 8000 });
    const host = `http://127.0.0.1:${port}`;
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.listen(port, async() => {
        await open(`${host}/`);
        setupCommandAndControl();
        setupLogin();
    });
    console.log(`Running on port ${port}`);
})();