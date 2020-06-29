require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport')

const PORT = process.env.PORT || 3001;

const server = express();
server.use(bodyParser.json());
server.use(cors());
/*server.use(cors({
    origin: 'http://growactivity.vincentms.me'
}));*/
server.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());

//routes

//user
const userRoute = require('./routes/user');
server.use('/user',userRoute);

//activity
const activityRoute = require('./routes/activity');
server.use('/activity',activityRoute);

//todo
const todoRoute = require('./routes/todo');
server.use('/todo',todoRoute);

//goal
const goalRoute = require('./routes/goal');
server.use('/goal',goalRoute);

//session
const sessionRoute = require('./routes/session');
server.use('/session',sessionRoute);


mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('MongoDB *> Database connection sucessfull!'));
mongoose.set('useCreateIndex', true);

server.listen(PORT, () => console.log("API *> Api running..."));