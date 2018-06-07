let express = require("express");
let exphbs = require("express-handlebars");
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");

let db = require("./models/index.js");
let app = express();

mongoose.connect("mongodb://localhost/breadscraper");

let PORT = process.env.PORT || 8080;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars");

app.use((req, res, next) => {
    req.db = db;
    next();
})

require("./routing/apiRoutes.js")(app);
require("./routing/htmlRoutes.js")(app);

app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
})