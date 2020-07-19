import React from "react";

class CharacterButton extends React.Component {
// export default class CharacterButton extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          bgColor: ['white', '#0099FF'],
          cname: this.props.cname,
          bgIndex: 0
        }
        //this.changeColor = this.changeColor.bind(this);
    }

    //changeColor(){
    //   this.setState({bgIndex: (this.state.bgIndex+1)%2 })
    //   //console.log("bgIndex", this.state.bgIndex)
    //}

    addNumber(name){
      //this.setState({number: Math.max(this.state.number+1, 0)})
      this.props.addNumber(name)
    }

    deductNumber(name){
      //this.setState({number: Math.max(this.state.number-1, 0)})
      this.props.deductNumber(name)
    }

    render(){
        return (
          <div>
          
          <button 
            style={{backgroundColor:this.state.bgColor[this.props.bgIndex]}}>
            {this.state.cname}
          </button>      

          <button 
            onClick={() => this.deductNumber(this.props.name)}>
            -
          </button>
          {this.props.number}
          <button 
            onClick={() => this.addNumber(this.props.name)}>
            +
          </button>

          </div>
        )
    }
}

export default CharacterButton;