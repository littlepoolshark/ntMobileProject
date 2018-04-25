//@flow
import "../../scss/page/ShareCoupon.scss";
import ShareCouponAction from "../actions/ShareCouponAction";
import ShareCouponStore from "../stores/ShareCouponStore";
import React, { Component, PropTypes } from 'react';
import Container from "../UIComponents/Container";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";
import SlideMask from "../UIComponents/SlideMask";
import NoDataHint from "./utilities/NoDataHint";
import cookie from "../lib/cookie";
import className from "classnames";



class ShareCoupon extends Component {
    state: {
        data: Object,
        isMaskOpen: boolean,
        isModalOpen: boolean
    }

    constructor(props: Object) {
        super(props);
        this.state = {
            data: ShareCouponStore.getAll(),
            isMaskOpen: false,
            isModalOpen: false
        }
    }

    _openSlideMask() {
        this.setState({
            isMaskOpen: true
        })
    }

    _openModal() {
        this.setState({
            isModalOpen: true,
            isMaskOpen: false
        })
    }

    _closeModal() {
        this.setState({
            isModalOpen: false,
            isMaskOpen: false
        })
    }

    _handleShareBtnClick(couponId: string, counponAmount: number, counponType: string) {
        let phoneNo: string = cookie.getCookie("phoneNo");
        document.title = `我在农泰金融送你${counponAmount}${counponType === "redPackage" ? "元红包" : "%加息券"}，快来领取吧！`
        window.history.replaceState(null, "你的好友给你发了一个红包", "#/openRedPackage?&couponId=" + couponId + "&phoneNo=" + phoneNo);
        this._openSlideMask();
    }

    render() {
        let couponList: Array<Object> = this.state.data.couponList;
        let isEmpty: boolean = couponList.length <= 0;

        return (
            <Container id="shareCoupon" scrollable={true}>
                <img src={require("../../img/share-Coupon-banner@2x.png")} alt="" />
                {
                    isEmpty ?
                        <NoDataHint /> :
                        couponList.map((item, index) => {
                            return (
                                <CouponCard {...item} key={index} onShare={(couponId, counponAmount, counponType) => { this._handleShareBtnClick(couponId, counponAmount, counponType) }} />
                            )
                        })
                }
                <div className="footer-bg-wrapper">
                    <img src={require("../../img/share-Coupon-footer@2x.png")} alt="" className="footer-bg-img" />
                    {/*<div className="footer-text" onClick={ () => { this._openModal() }} >如何获得分享礼券？</div>                    */}
                </div>
                <SlideMask isMaskOpen={this.state.isMaskOpen}>
                    <img src={require("../../img/share-guide.png")} alt="" className="share-guide-img" />
                </SlideMask>
                <Modal
                    role="alert"
                    isOpen={this.state.isModalOpen}
                    onAction={() => { this._closeModal() }}
                >
                    优惠券由平台不定期定向发放，<br />
                    请密切关注平台活动
                </Modal>
            </Container>
        );
    }

    componentDidMount() {
        ShareCouponAction.getInitialData();

        ShareCouponStore.bind("change", () => {
            this.setState({
                data: ShareCouponStore.getAll()
            })
        });

    }
}


const CouponCard = props => {
    let {
        id,
        couponType,
        counponAmount,
        remaindCount,
        hadBeenGetCount,
        deadline,
        onShare,
        isValid,
        couponHint,
        useCondition
    } = props;



    let couponClass=className(
        "CouponCard",
        "cf",
        {
            "is-disabled":!isValid
        });

    let couponTagClass= className(
        "CouponCard-tag",
        {
            "CouponCard-tag--redPacket":couponType === "redPackage",
            "CouponCard-tag--interest":couponType === "interest",
        });

    return (
        <div className={couponClass} onClick={isValid ? onShare.bind(null,id,counponAmount,couponType) : null}>
            <div className="CouponCard-body">
                <div className="CouponCard-body-summary">
                    <div>
                        <span className="u-interestAmount">{counponAmount}</span>
                        <span className="u-interestUnit">{couponType === "redPackage" ? "元" : "%"}</span>
                    </div>
                    <div className="u-deadlineOfInterest">{couponHint}</div>
                </div>
                <div className="CouponCard-body-detail">
                    <div className="u-title">
                        剩余可发：<strong>{remaindCount}</strong>
                    </div>
                     <div className="u-title">
                        被领取：<strong>{hadBeenGetCount}</strong>个
                    </div>
                </div>
                <div className="CouponCard-body-shareBtn">
                    <span>立</span>
                    <span>即</span>
                    <span>发</span>
                    <span>放</span>
                </div>
            </div>
            <div className="CouponCard-footer">
                <div>{useCondition}</div>
                <div>领取截止时间：{deadline}</div>
            </div>
            <div className={couponTagClass}></div>
        </div >
       
    );
};

CouponCard.propTypes = {
    couponType: PropTypes.oneOf(["redPackage", "interest"]).isRequired,
    counponAmount: PropTypes.number.isRequired,
    remaindCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    hadBeenGetCount: PropTypes.number.isRequired,
    deadline: PropTypes.string.isRequired,
    onShare: PropTypes.func.isRequired
};


ShareCoupon.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = ShareCoupon;