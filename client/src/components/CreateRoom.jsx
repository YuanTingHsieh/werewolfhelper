import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import CharacterButton from "./CharacterButton.jsx";
import { parseJSON, checkStatus } from "./utils";

function sum(obj) {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}

function checkValid(characters, board) {
  for (const key in characters) {
    if (key in board) {
      if (characters[key] !== board[key]) {
        return false;
      }
    } else if (characters[key] !== 0) {
      return false;
    }
  }
  return true;
}

export default class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidRoom: false, // if current setup is valid or not
      roomid: "",
      time: 120,
      players: 0,
      characters: {},
      charactersMapping: {},
      boards: {},
      hasResult: false, // if the result is returned or not
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/api/characters`, {
      method: "GET",
      accept: "application: json",
      mode: "cors",
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        let characters = {};
        Object.keys(data).forEach((key) => {
          characters[key] = 0;
        });
        this.setState({ characters: characters, charactersMapping: data });
      })
      .catch((err) => {
        console.log("Fetch character error " + err);
      });

    fetch(`http://localhost:3001/api/boards`, {
      method: "GET",
      accept: "application: json",
      mode: "cors",
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        this.setState({ boards: data });
      })
      .catch((err) => {
        console.log("Fetch character error " + err);
      });
  }

  setCharNumber = (name, value) => {
    this.setState(
      (prevState) => {
        let characters = prevState.characters;
        characters[name] = parseInt(value);
        const players = sum(characters);
        return { characters: characters, players: players };
      },
      () => this.validateRoom()
    );
  };

  validateRoom = () => {
    for (const key in this.state.boards) {
      if (checkValid(this.state.characters, this.state.boards[key])) {
        this.setState({ isValidRoom: true });
        console.log("Found equal room!");
        break;
      }
    }
  };

  onClickCreateRoom = () => {
    fetch(`http://localhost:3001/api/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        time: this.state.time,
        players: this.state.players,
        characters: this.state.characters,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          hasResult: true,
          roomid: data["roomid"],
        });
      })
      .catch((err) => {
        console.err(err);
      });
  };

  onClickSetBoard = (key) => {
    const board = this.state.boards[key];
    let characters = this.state.characters;
    for (const character in characters) {
      if (character in board) {
        characters[character] = board[character];
      } else {
        characters[character] = 0;
      }
    }
    this.setState({ characters: characters, isValidRoom: true });
  };

  render = () => {
    let existingBoards = Object.keys(this.state.boards).map((key) => (
      <Button
        className="mr-1 mb-1"
        size="md"
        variant="outline-info"
        onClick={() => {
          this.onClickSetBoard(key);
        }}
      >
        {key}
      </Button>
    ));
    let listItems = Object.entries(
      this.state.charactersMapping
    ).map(([key, value], i) => (
      <CharacterButton
        key={i}
        cname={value}
        name={key}
        number={this.state.characters[key]}
        setCharNumber={this.setCharNumber}
      />
    ));
    return (
      <Container className="p-3">
        <div className="text-center">
          {existingBoards}
          {listItems}
          <Button
            size="lg"
            disabled={!this.state.isValidRoom}
            onClick={this.onClickCreateRoom}
          >
            創造房間
          </Button>
          {this.state.isValidRoom ? null : <div>房間不符合已存在的板子。</div>}
          {this.state.hasResult ? (
            <div>房間 {this.state.roomid} 已創造。</div>
          ) : null}
        </div>
      </Container>
    );
  };
}
