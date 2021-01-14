const path = require("path");

const initialize = async(port, express) => {
    const app = express();
    return new Promise((resolve, reject) => {
        app.use(express.json());
        app.get("/files/:file(*)", function(req, res, next) { //serve malware executables
            console.log(__dirname);
            var filePath = path.join(__dirname, "../../../", "build/", req.params.file);
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
            res.sendFile(path.join(__dirname, "../ui", "/index.html"));
        });

        app.listen(port, async() => {
            console.log(`Downloads site running on port ${port}`);
            resolve();
        });
    });
};

module.exports = {
    initialize
}