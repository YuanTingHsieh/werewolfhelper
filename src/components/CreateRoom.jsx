import React from "react";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import CharacterButton from "./utils/CharacterButton"

class CreateRoom extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        "seer": 0,
        "witch": 0,
        "hunter": 0,
        "guard": 0,
        "idiot": 0,
        "wolfKing": 0,
        "whiteWolfKing": 0,
        "wolfBeauty": 0,
        "wolf": 0,
        "villager": 0,

        "seer_bg":0,
        "witch_bg": 0,
        "hunter_bg": 0,
        "guard_bg": 0,
        "idiot_bg": 0,
        "wolfKing_bg": 0,
        "whiteWolfKing_bg": 0,
        "wolfBeauty_bg": 0,
        "wolf_bg": 0,
        "villager_bg": 0,
      };

      this.addNumber = this.addNumber.bind(this);
      this.deductNumber = this.deductNumber.bind(this);
    };


    addNumber(name){
      this.setState({[name]: Math.max(this.state[name]+1, 0)}, () => {
        // console.log(this.state);
        var bg_name = `${name}_bg`
        if (this.state[name] > 0) {
          this.setState({[bg_name]: 1})
        }
      })
    };

    deductNumber(name){
      this.setState({[name]: Math.max(this.state[name]-1, 0)}, () => {
        // console.log(this.state);
        var bg_name = `${name}_bg`
        if (this.state[name] === 0) {
          this.setState({[bg_name]: 0})
        }
      })
    };

    render() {
      return (
        <div>
          <br />
          <CharacterButton cname="預言家" name="seer" number={this.state["seer"]} bgIndex={this.state["seer_bg"]} addNumber={this.addNumber} deductNumber={this.deductNumber} /> <br />
          <CharacterButton cname="女巫" name="witch" number={this.state["witch"]} bgIndex={this.state["witch_bg"]} addNumber={this.addNumber} deductNumber={this.deductNumber} /> <br />
          <CharacterButton cname="獵人" name="hunter" number={this.state["hunter"]} bgIndex={this.state["hunter_bg"]} addNumber={this.addNumber} deductNumber={this.deductNumber} /> <br />
          <CharacterButton cname="守衛" name="guard" number={this.state["guard"]} bgIndex={this.state["guard_bg"]} addNumber={this.addNumber} deductNumber={this.deductNumber} /> <br />
          <CharacterButton cname="白痴" name="idiot" number={this.state["idiot"]} bgIndex={this.state["idiot_bg"]} addNumber={this.addNumber} deductNumber={this.deductNumber} /> <br />
          <CharacterButton cname="狼王" name="wolfKing" number={this.state["wolfKing"]} bgIndex={this.state["wolfKing_bg"]} addNumber={this.addNumber} deductNumber={this.deductNumber} /> <br />
          <CharacterButton cname="白狼王" name="whiteWolfKing" number={this.state["whiteWolfKing"]} bgIndex={this.state["whiteWolfKing_bg"]} addNumber={this.addNumber} deductNumber={this.deductNumber} /> <br />
          <CharacterButton cname="狼美人" name="wolfBeauty" number={this.state["wolfBeauty"]} bgIndex={this.state["wolfBeauty_bg"]} addNumber={this.addNumber} deductNumber={this.deductNumber} /> <br />
          <CharacterButton cname="狼人" name="wolf" number={this.state["wolf"]} bgIndex={this.state["wolf_bg"]} addNumber={this.addNumber} deductNumber={this.deductNumber} /> <br />
          <CharacterButton cname="平民" name="villager" number={this.state["villager"]} bgIndex={this.state["villager_bg"]} addNumber={this.addNumber} deductNumber={this.deductNumber} /> <br />
          <br/>

          <Link to="/createroom"><Button>Create My Room</Button></Link>

        </div>
      );
    }
}


export default CreateRoom;