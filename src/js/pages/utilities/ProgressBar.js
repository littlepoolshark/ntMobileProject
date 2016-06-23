require("../../../scss/page/ProgressBar.scss");
import React from "react";

let ProgressBar=React.createClass({
    render(){
        return (
            <div className="progressBar">
                <div className="progressBar-body" style={{width:this.props.progressPercent}}></div>
                <span className="progress-percent">{this.props.progressPercent}</span>
            </div>
        )
    }
});

export default  ProgressBar;