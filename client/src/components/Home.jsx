import React from 'react';

import { Link } from 'react-router-dom';

import Button from "react-bootstrap/Button";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class JoinRoom extends React.Component{
  constructor() {
    super();
    this.state = {
      roomid: ""
    }
  }

  onChangeRoomID = (evt) => {
    this.setState({roomid: evt.target.value});
  }

  render = () => {
    return (
      <div className='text-center'>
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">房間ID</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={this.state.roomid} onChange={this.onChangeRoomID} />
          <Link to={{pathname: `/room/${this.state.roomid}`}}>
            <Button size='lg' disabled={!this.state.roomid}>加入房間</Button>
          </Link>
        </InputGroup>
      </div>
    )
  }

};

const HomePage = () => {
  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">狼人殺面殺助手v1</h1>

        <div className='text-center'>
          <Link to="/createroom"><Button size='lg'>創建房間</Button></Link>
        </div>
        <JoinRoom />

      </Jumbotron>
    </Container>
  );
};
export default HomePage;