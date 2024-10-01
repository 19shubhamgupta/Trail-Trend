const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const  path = require('path')
const flash = require('connect-flash')
const expressSession = require('express-session')

const dataBase = require('./config/mongoConection')
const usersRouter = require('./routes/usersRouter')
const ownersRouter = require('./routes/ownersRouter')
const productsRouter = require('./routes/productsRouter')
const indexRouter = require('./routes/indexRouter')
require('dotenv').config();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(
  expressSession({
    resave : false,
    saveUninitialized : false,
    secret : 'shubham',
  })
)
app.use(flash())

app.use("/" , indexRouter)
app.use("/users" , usersRouter)
app.use("/owners" ,ownersRouter)
app.use("/products" ,productsRouter)

app.listen(3000, () => {
  console.log("server is running");
  
});
