import React, { Component } from "react";
import styles from "./Select.module.scss";
import { Input } from "reactstrap";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { translate } from "common/methods/translations";

@observer
class SelectElement extends Component {
  @observable selectedElement = "";

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { initialOption } = this.props;
    this.selectedElement = initialOption || "initial";
  }

  handleChange(event) {
    this.selectedElement = event.target.value;
    const { selectedOption } = this.props;
    selectedOption(this.selectedElement);
  }

  static mapOptions(allOptions) {
    return allOptions.map((singleOption, index) => {
      return (
        <option
          key={`options-${singleOption.name}-${index}`}
          name={singleOption.name}
          value={singleOption.value}
        >
          {singleOption.name}
        </option>
      );
    });
  }

  render() {
    const { setOptions, className } = this.props;
    return (
      <div className={`${styles.Container} ${className}`}>
        <Input
          type="select"
          name="select"
          value={this.selectedElement}
          onChange={this.handleChange}
        >
          <option value="">{translate("globals.selectOption")}</option>
          {setOptions && setOptions.length > 0 ? (
            SelectElement.mapOptions(setOptions)
          ) : (
            <div />
          )}
        </Input>
      </div>
    );
  }
}

export default SelectElement;
