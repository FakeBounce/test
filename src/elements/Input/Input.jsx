import React, { Component } from "react";
import styles from "./Input.module.scss";
import { Input } from "reactstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";
import classNames from "classnames";

@observer
class InputElement extends Component {
  @observable inputValue = "";

  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { initialValue } = this.props;
    this.inputValue = initialValue ? initialValue : "";
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.initialValue) {
      this.inputValue = nextProps.initialValue ? nextProps.initialValue : "";
    }
  }

  handleInputChange(event) {
    const { inputValue } = this.props;
    inputValue(event.target.value);
    this.inputValue = event.target.value;
  }

  render() {
    const { placeholder, className } = this.props;

    const containerClass = classNames(styles.InputContainer, className);

    return (
      <div className={containerClass || null}>
        <Input
          placeholder={placeholder}
          value={this.inputValue}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default InputElement;
