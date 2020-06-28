import React from 'react';

import { Link } from 'react-router-dom';

import Button from "react-bootstrap/Button";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const HomePage = () => {
  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">Welcome To WereWolf Helper!</h1>

        <Link to="/createroom"><Button>Create New Room</Button></Link>

        <Button>Join exist room</Button>
      </Jumbotron>
    </Container>
  );
};
export default HomePage;