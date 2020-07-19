import React from "react";
import Button from "react-bootstrap/Button";

export default class CreateRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      isValidRoom: true, // if current setup is valid or not
      roomid: "",
      time: 120,
      players: 12,
      characters: "4god4wolf",
      hasResult: false // if the result is returned or not
    };
  }

  onClickCreateRoom = () => {
    fetch(`http://localhost:3001/api/room`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      mode: "cors",
      body: JSON.stringify({
        time: this.state.time,
        players: this.state.players,
        characters: this.state.characters
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({
        hasResult: true,
        roomid: data['roomid']
      });
    })
    .catch(err => {
      console.err(err);
    })
  }
  
  render = () => {
    return (
      <div className='text-center'>
        <Button size='lg' disabled={!this.state.isValidRoom} onClick={this.onClickCreateRoom}>創造房間</Button>
        { this.state.hasResult ? <div>Room {this.state.roomid} is created.</div> : null }
      </div>
    );
  }
};
