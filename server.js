const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

let rooms = {};

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
app.options('*', cors());

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(static("client/build"));
}

app.get("/api/rooms", (req, res) => {
  res.json({"rooms": Object.keys(rooms)});
});

app.post("/api/room", (req, res) => {
  console.log(req.body);
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