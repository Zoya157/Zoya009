var express = require("express");
var expressLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser");
var reload = require('reload');
var mongoose = require("mongoose");
var session = require("express-session")
const productsRouter = require('./routes/product');
const methodOverride = require('method-override');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use('/products', productsRouter);

app.use(expressLayouts);
// app.use(cookieParser()) 
app.use(
  session({
    secret: "Secret",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
// app.use(require("./middlewares/checkSession"));





// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/Intos',{  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// load routes
app.use('/', require('./routes/router'));

app.listen(4000, () => {
  console.log("Server Started");
});

// Defining User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }, 
  email: {
    type: String,
    unique: true,
    required: true
  }, 
  gender : String,
  status : String
})

// Defining User model
const Userdb = mongoose.model('Userdb', userSchema) 
module.exports =  Userdb;


reload(app);
