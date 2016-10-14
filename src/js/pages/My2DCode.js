require("../../scss/page/My2DCode.scss");
import React from "react";
import classNames from "classnames";
/*import qrgen from 'jsqrgen';*/


//ui component
import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";



let My2DCode=React.createClass({
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
    _jumpToNextLocation(){
        this.context.router.push({
            pathname:"aboutUs"
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
        });
        return (
            <Container id="my2DCode"  scrollable={false}>
                <div className="my2DCodeImg-wrapper">
                    <div className="header">
                        <img src={require("../../img/qr_bg_titlecolor.png")} alt=""/>
                    </div>
                    <div className="body">
                        <div className="text-center" className="code-img-wrapper" id="codeImgWrapper" ></div>
                        <img src={require("../../img/qr_gold.png")} alt="" className="bg-img"/>
                    </div>
                </div>
                {
                    <div className="buts-wrapper">
                        <Button amStyle="primary" block radius onClick={this._showShareTip}>分享给好友</Button>
                        <Button amStyle="warning" block radius onClick={this._jumpToNextLocation}>更多农泰金融成长历程</Button>
                    </div>
                }
                <div className={maskClasses} onClick={this._closeShareTip}>
                    <img src={require("../../img/share-guide.png")} alt="" className="share-guide-img"/>
                </div>
            </Container>
        )
    },
    componentDidMount(){
        //使用qrcode.js原生插件来生成二维码
         let codeUrl=this.props.location.query.codeUrl;
         //let codeUrl="http://192.168.1.90:1024/#/?view=register&inviteCode=123456";
         new QRCode(document.getElementById("codeImgWrapper"), {
            text: codeUrl,
            width: 170,
            height: 170,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
});

My2DCode.contextTypes = {
    router:React.PropTypes.object.isRequired
};

module.exports=My2DCode;