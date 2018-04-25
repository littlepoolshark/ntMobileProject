import React, { Component, PropTypes } from "react";

import Picker from "./Picker";
import loanerTypeMap from "../lib/loanerTypeMap";

class LoanerTypePicker extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onFinished: PropTypes.func.isRequired
  };

  static state = {
    isOpen: PropTypes.bool,
    optionGroups: PropTypes.object,
    valueGroups: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false || props.isOpen,
      valueGroups: {
        loanerType: "个人"
      },
      optionGroups: {
        loanerType: loanerTypeMap.getLoanerTypeList()
      }
    };
  }

  _handleChange = (name, value) => {
    this.setState(({ valueGroups }) => {
      return {
        valueGroups: {
          ...valueGroups,
          [name]: value
        }
      };
    });
  };

  _handleFinished = () => {
    this.setState(
      {
        isOpen: false
      },
      () => {
        let { loanerType } = this.state.valueGroups;

        this.props.onFinished && this.props.onFinished(loanerType);
      }
    );
  };

  _handleCancel = () => {
    this.setState(
      {
        isOpen: false
      },
      () => {
        this.props.onCancel && this.props.onCancel();
      }
    );
  };

  render() {
    let { isOpen, optionGroups, valueGroups } = this.state;

    return (
      <Picker
        isOpen={isOpen}
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={this._handleChange}
        onFinished={this._handleFinished}
        onCancel={this._handleCancel}
      />
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen
      });
    }
  }
}

export default LoanerTypePicker;
