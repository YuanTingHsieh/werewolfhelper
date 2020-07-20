import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import CharacterButton from "./utils/CharacterButton.jsx";

const charactersMapping = {
  seer: "預言家",
  witch: "女巫",
  hunter: "獵人",
  guard: "守衛",
  wolf: "狼人",
  wolfKing: "狼王",
  whiteWolfKing: "白狼王",
  wolfBeauty: "狼美人",
  villager: "平民",
};

export default class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidRoom: true, // if current setup is valid or not
      roomid: "",
      time: 120,
      players: 12,
      characters: {
        seer: 0,
        witch: 0,
        hunter: 0,
        guard: 0,
        idiot: 0,
        wolfKing: 0,
        whiteWolfKing: 0,
        wolfBeauty: 0,
        wolf: 0,
        villager: 0,
      },
      hasResult: false, // if the result is returned or not
    };
  }

  addNumber = (name) => {
    this.setState((prevState) => {
      let characters = prevState.characters;
      characters[name] += 1;
      return { characters: characters };
    });
  };

  deductNumber = (name) => {
    this.setState((prevState) => {
      let characters = prevState.characters;
      characters[name] -= 1;
      return { characters: characters };
    });
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

  render = () => {
    let listItems = Object.entries(charactersMapping).map(([key, value], i) => (
      <CharacterButton
        key={i}
        cname={value}
        name={key}
        number={this.state.characters[key]}
        addNumber={this.addNumber}
        deductNumber={this.deductNumber}
      />
    ));
    return (
      <Container className="p-3">
        <div className="text-center">
          
            {listItems}
            <Button
              size="lg"
              disabled={!this.state.isValidRoom}
              onClick={this.onClickCreateRoom}
            >
              創造房間
            </Button>
            {this.state.hasResult ? (
              <div>房間 {this.state.roomid} 已創造。</div>
            ) : null}
        </div>
      </Container>
    );
  };
}
