const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config= require('./config');
const utils = require('./utils');

const projectsRoutes = require('./routes/projects.routes');
const authRoutes = require('./routes/auth.routes');
const pluginsRoutes = require('./routes/plugins.routes');
const audioloopsroute = require('./routes/audioloops.routes.js');

const path = require("path");

const app = express();
app.use(express.json());
app.use(cors(config.corsOptions));
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
});

utils.checkEnvVars();
utils.createDirectories();
utils.createFiles();

app.use(projectsRoutes);
app.use(authRoutes);
app.use(pluginsRoutes);
app.use(audioloopsroute);

app.use("/", express.static(path.join(__dirname, "../PedalBoard")));
app.use("/plugins", express.static(path.join(__dirname, "../plugins")));
app.use("/songs", express.static(path.join(__dirname, "../songs")));
app.use("/loops", express.static(path.join(__dirname, "../loops")));


app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
});