import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import HomePage from "./Home.jsx";
import CreateRoom from "./CreateRoom.jsx";
import GameRoom from "./GameRoom.jsx";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [screen, setScreen] = useState("auth");

  const auth = () => {
    let headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + Buffer.from(username + ":" + password).toString("base64")
    );
    headers.set("Content-Type", "application/json");
    fetch(`/authenticate`, {
      method: "GET",
      mode: "cors",
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.screen !== undefined) {
          setScreen(json.screen);
        }
        localStorage.setItem("username", username);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const register = () => {
    fetch(`/register`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((e) => console.error(e));
  };

  const readCookie = () => {
    fetch(`/read-cookie`, {
      method: "GET"})
      .then((response) => response.json())
      .then((json) => {
        if (json.screen !== undefined) {
          setScreen(json.screen);
        }
      })
      .catch((e) => {
        setScreen("auth");
        console.log(e);
      });
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div className="App">
      {screen === "auth" ? (
        <>
          <Col md={{ span: 5, offset: 3 }}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>用戶名</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                name="username"
                placeholder="你的名字"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={{ span: 5, offset: 3 }}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>密碼</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                name="password"
                placeholder="密碼"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                type="password"
              />
            </InputGroup>
          </Col>
          <Col md={{ span: 3, offset: 3 }}>
            <Button onClick={auth}>登入</Button>
            <Button onClick={register}>註冊</Button>
          </Col>
        </>
      ) : (
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={() => <HomePage username={username} />}
          />
          <Route path="/createroom" component={CreateRoom} />
          <Route path="/room/:roomid" component={GameRoom} />
        </BrowserRouter>
      )}
    </div>
  );
};
export default App;
