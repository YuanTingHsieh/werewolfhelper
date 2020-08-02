const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const basicAuth = require('express-basic-auth');

const auth = basicAuth({
  users: {
    admin: 'admin'
  },
});

let rooms = {};
let boardPath = './data/boards.json';
let characterPath = './data/characters.json';
let boardData = JSON.parse(fs.readFileSync(boardPath));
let characterData = JSON.parse(fs.readFileSync(characterPath));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
app.options('*', cors());

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// A random key for signing the cookie
app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

app.get('/register', (req, res) => {
  let { username, password } = req.body;
  console.log(username);
  console.log(password);

  if (username in users) {
    res.status(400);
    res.json({
      error: "Username alredy exists!"
    });
    return;
  }

  users[username] = password;
});

app.get('/authenticate', auth, (req, res) => {
  const options = {
    httpOnly: true,
    signed: true,
  };

  console.log(req.auth.user);

  if (req.auth.user === 'admin') {
    res.cookie('name', 'admin', options).send({ screen: 'admin' });
  } else {
    res.cookie('name', req.auth.user, options).send({ screen: req.auth.user });
  }
});

app.get('/read-cookie', (req, res) => {
  if (req.signedCookies.name === 'admin') {
    res.send({ screen: 'admin' });
  } else if (req.signedCookies.name === 'user') {
    res.send({ screen: 'user' });
  } else {
    res.send({ screen: 'auth' });
  }
});

app.get('/clear-cookie', (req, res) => {
  res.clearCookie('name').end();
});

app.get("/api/boards", (req, res) => {
  res.json(boardData);
});

app.get("/api/characters", (req, res) => {
  res.json(characterData);
});

app.get("/api/rooms", (req, res) => {
  res.json({"rooms": Object.keys(rooms)});
});

app.post("/api/room", (req, res) => {
  let roomid = uuidv4();
  rooms[roomid] = req.body;
  res.json({roomid: roomid});
});

app.get("/api/room", (req, res) => {
  const param = req.query.roomid;

  if (!param) {
    res.status(400);
    res.json({
      error: "Missing required parameter `roomid`"
    });
    return;
  }

  if (param in rooms) {
    res.json(rooms[param]);
    return;
  }

  res.status(404);
  res.json({
    error: "Room: " + param + " not found!"
  });
  
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});