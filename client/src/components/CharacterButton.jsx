import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";

export default class CharacterButton extends React.Component {
  handleChange = (evt) => {
    const value = evt.target.value;
    if (!isNaN(value) && value > 0) {
      this.props.setCharNumber(this.props.name, value);
    }
  };

  onClickAdd = () => {
    this.props.setCharNumber(this.props.name, this.props.number + 1);
  };

  onClickDeduct = () => {
    this.props.setCharNumber(this.props.name, this.props.number - 1);
  };

  render() {
    return (
      <Col md={{ span: 3, offset: 4 }}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            {this.props.number > 0 ? (
              <Button disabled={true} variant="secondary">{this.props.cname}</Button>
            ) : (
              <Button disabled={true} variant="outline-secondary">
                {this.props.cname}
              </Button>
            )}
            <Button onClick={this.onClickDeduct} disabled={this.props.number === 0}> - </Button>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            type="number"
            value={this.props.number}
            onChange={this.handleChange}
          />
          <InputGroup.Append>
            <Button onClick={this.onClickAdd}> + </Button>
          </InputGroup.Append>
        </InputGroup>
      </Col>
    );
  }
}
