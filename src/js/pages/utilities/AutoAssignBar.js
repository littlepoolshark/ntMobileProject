import React, { Component } from 'react';
import  classNames from 'classnames';
require("../../../scss/page/AutoAssignBar.scss");
//let AutoAssignBarStore=require("../../../stores/AutoAssignBarStore");
//let AutoAssignBarAction=require("../../../actions/AutoAssignBarAction");

import Button from "../../UIComponents/Button";
import Icon from "../../UIComponents/Icon";


class AutoAssignBar extends Component {
    constructor(props){
        super(props);
        this.state={
            isAgreementChecked:false
        }
    }
    _toggleAgreementCheck=() => {
        this.setState({
            isAgreementChecked:!this.state.isAgreementChecked
        })
    }
    render() {
        let iconClassName=classNames({
            "agreement-checkbox":this.state.isAgreementChecked,
            "agreement-checkbox-unchecked":!this.state.isAgreementChecked
        })
        return (
            <div id="autoAssignBar">
                <div className="iconWrapper"> 
                    <Icon classPrefix="imgIcon" name={iconClassName} onClick={this._toggleAgreementCheck} />
                        授权平台申电子签章并自动签约
                </div>
                <Button 
                    block
                    radius
                    amStyle="primary"
                    onClick={this.props.assignAgreement.bind(null,this.state.isAgreementChecked)}
                >
                    确定签署
                </Button>
            </div>
        );
    }
}
export default AutoAssignBar;