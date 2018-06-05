let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");

let db = require("./models");
let app = express();

let PORT = process.env.PORT || 8080;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
    req.db = db;
    next();
})

require("./routing/htmlRoutes.js")(app);
require("./routing/apiRoutes.js")(app);

app.listen(PORT, function() {
    console.log(`app running on port ${PORT}`);
})