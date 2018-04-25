import "../../../scss/page/PABankSeviceAgreementLink.scss"
import React from 'react';
import { Link } from "react-router";
import { Icon } from "../../UIComponents/index";


const PABankSeviceAgreementLink = (props) => {
    let {
        isAgreementChecked,
        toggleCheck
    }=props;

    return (
        <div id="PABankSeviceAgreementLink">
            <Icon name={isAgreementChecked ? "agreement-checkbox" : "agreement-checkbox-unchecked"} classPrefix="imgIcon" onClick={toggleCheck}/> 
            我已经阅读并同意
            <Link to="seviceAgreement_registerToPABank">《平安银行网络借贷资金存管三方协议》</Link>   
        </div>
    );
};

export default PABankSeviceAgreementLink;