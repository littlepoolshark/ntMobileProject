require("../../../scss/page/ProgressBar.scss");
import React from "react";

let ProgressBar=React.createClass({
    getDefaultProps(){
      return {
          hasProgressPercent:true,
          percent:"0%"
      }
    },
    render(){
        return (
            <div className="progressBar" style={{width:this.props.width ? this.props.width : "100%"}}>
                <div className="progressBar-body" style={{width:this.props.percent}}></div>
                {
                    this.props.hasProgressPercent ?
                    <span className="progress-percent">{this.props.percent}</span> :
                    null
                }
            </div>
        )
    }
});

export default  ProgressBar;