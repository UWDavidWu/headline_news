const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("./auth/passport");
const session = require("express-session");


const path = require("path");
const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.enable("trust proxy")

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


app.use("/news", require("./routes/newsRoutes"));

app.use("/auth", require("./routes/authRoutes"));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'../', 'client', 'build', 'index.html'));
  })
}



app.listen(PORT, () => {
  console.log(`App listening on ${PORT}!`);
});
