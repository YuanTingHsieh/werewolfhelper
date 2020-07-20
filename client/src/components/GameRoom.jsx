import React from 'react';

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

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export default class GameRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      players: 0,
      characters: {},
    };
  }

  componentDidMount = () => {
    fetch(`http://localhost:3001/api/room?roomid=${this.props.match.params.roomid}`, {
      method: "GET",
      accept: "application: json",
      mode: "cors"
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        console.log(data);
        this.setState({
          valid: true,
          players: data['players'],
          characters: data['characters']
        })
      })
      .catch(err => {
        console.log("Error " + err);
      })

    
  }

  render = () => {
    if (!this.state.valid)
      return (
        <div>房間 {this.props.match.params.roomid} 不存在。 請先創建房間。</div>
      );
    let boardstr = "";
    Object.keys(this.state.characters).forEach(k => {
      let number = this.state.characters[k];
      boardstr += number > 0 ? (charactersMapping[k] + number) : "";
    })
    return (
      <div>
        This is room {this.props.match.params.roomid}.
        We have {this.state.players} players.
        Board {boardstr}.
      </div>
    );
  }
}
