var express = require("express");
var expressLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser");
var reload = require('reload');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);

app.listen(3000, () => {
    console.log("Server Started");
  });

reload(app);