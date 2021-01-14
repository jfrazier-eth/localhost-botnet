const path = require("path");

const initialize = async(port, express) => {
    const app = express();
    const uiPath = path.join(__dirname, "../ui");
    return new Promise((resolve, reject) => {
        app.use(express.json());
        app.use(
            "/login.js",
            express.static(path.join(uiPath, "/login.js"))
        );

        app.get("/login", function(req, res) {
            res.sendFile(path.join(uiPath, "/login.html"));
        });

        app.get("/admin.html", function(req, res) {
            res.sendFile(path.join(uiPath, "/admin.html"));
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
            console.log(`Victim running on port ${port}`);
            resolve();
        });

    });
};

module.exports = {
    initialize: initialize
}