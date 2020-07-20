import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";

export default class CharacterButton extends React.Component {
  handleChange = (evt) => {
    const value = evt.target.value;
    if (!isNaN(value) && value > 0) {
      this.props.setItemQty(value);
    }
  };

  onClickAdd = () => {
    this.props.addNumber(this.props.name);
  };

  onClickDeduct = () => {
    this.props.deductNumber(this.props.name);
  };

  render() {
    return (
      <Col md={{ span: 3, offset: 4 }}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            {this.props.number > 0 ? (
              <Button disabled="true">{this.props.cname}</Button>
            ) : (
              <Button disabled="true" variant="outline-primary">
                {this.props.cname}
              </Button>
            )}
            <Button onClick={this.onClickDeduct}> - </Button>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
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
