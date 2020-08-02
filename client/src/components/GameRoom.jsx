import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { parseJSON, checkStatus } from "./utils";

function PlayerPosition(props) {
  let handleChange = (evt) => {
    const value = evt.target.value;
    props.setPlayerName(props.number, value);
  };

  return (
    <Col>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>{props.number + 1}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          value={props.name}
          onChange={handleChange}
        />
      </InputGroup>
    </Col>
  );
}

export default class GameRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      players: Array(12).fill("你的名字"),
      numPlayers: 0,
      characters: {},
      charactersMapping: {},
    };
  }

  componentDidMount = () => {
    fetch(`/api/room?roomid=${this.props.match.params.roomid}`, {
      method: "GET",
      accept: "application: json",
      mode: "cors",
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log(data);
        this.setState({
          valid: true,
          numPlayers: data["players"],
          characters: data["characters"],
        });
      })
      .catch((err) => {
        console.log("Error " + err);
      });

    fetch(`/api/characters`, {
      method: "GET",
      accept: "application: json",
      mode: "cors",
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        this.setState({ charactersMapping: data });
      })
      .catch((err) => {
        console.log("Fetch character error " + err);
      });
  };

  setPlayerName = (number, name) => {
    this.setState((prevState) => {
      let players = prevState.players;
      players[number] = name;
      return { players: players };
    });
  };

  render = () => {
    if (!this.state.valid)
      return (
        <div>房間 {this.props.match.params.roomid} 不存在。 請先創建房間。</div>
      );
    let boardstr = "";
    Object.keys(this.state.characters).forEach((k) => {
      let number = this.state.characters[k];
      boardstr += number > 0 ? this.state.charactersMapping[k] + number : "";
    });
    let panel = [];
    for (let i = 0; i < 12; i += 2) {
      panel.push(
        <Row key={i}>
          <PlayerPosition
            number={i}
            name={this.state.players[i]}
            setPlayerName={this.setPlayerName}
          />
          <PlayerPosition
            number={i + 1}
            name={this.state.players[i + 1]}
            setPlayerName={this.setPlayerName}
          />
        </Row>
      );
    }
    return (
      <Container className="p-3">
        <Jumbotron>
          <Row>
            <Col>
              房間ID: {this.props.match.params.roomid}
            </Col>
            <Col>
              版子: {boardstr}.
            </Col>
          </Row>
          {panel}
        </Jumbotron>
      </Container>
    );
  };
}
