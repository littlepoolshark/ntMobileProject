require("../../scss/page/InviteMyFriend.scss");
import React from "react";
import classNames from "classnames";

//ui component
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";



let InviteMyFriend=React.createClass({
    getInitialState(){
        return {
            isMaskShow:false
        }
    },
    _showShareTip(){
        this.setState({
            isMaskShow:true
        });
    },
    _closeShareTip(){
        this.setState({
            isMaskShow:false
        });
    },
    render(){
        let maskClasses=classNames({
            mask:true,
            active:this.state.isMaskShow
        })
        return (
            <Container id="inviteMyFriend"  scrollable={true}>
                <img src={require("../../img/invi_bg_pic.png")} alt="" style={{width:"100%",height:"auto"}}/>
                <Button className="inviteFriend-btn" block amStyle="primary" onClick={this._showShareTip}>立即邀请</Button>
                <div className={maskClasses} onClick={this._closeShareTip}>
                    <img src={require("../../img/share-guide.png")} alt="" className="share-guide-img"/>
                </div>
            </Container>
        )
    },
    componentDidMount(){

    }
});

InviteMyFriend.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=InviteMyFriend;