import {Link} from "react-router";
import Group from "../../UIComponents/Group";
import config from "../../config";
import React, { PropTypes } from 'react';

/**
 * @desc 服务协议组件
 * @desc 这是无状态组件，意在整个组件树更新的时候，跳过virtual DOM的diff比较，从而提高性能。
 * @desc 为了避免一定程度的浪费，react官方还在0.14版本中加入了无状态组件
 * 
 * @param {object} props 
 * @returns 
 */
const ServiceAgreement = props => {
    let {
        type
    }=props;

    let linkPath:string="serviceAgreement_"+type;
    let serviceAgreementName:string= config.productNameMap[type] + "服务协议";
    const isLoanProductOrGLJ=["loan_product","glj","ced","nyd"].indexOf(type) > -1;
    if(isLoanProductOrGLJ){
        serviceAgreementName="借款协议";
    }
    return (
        <Group>
             <h6><span className="title-flag"></span>服务协议</h6>
            <div className="content">
                <input type="checkbox" defaultChecked  disabled/>
                同意
                {
                    !isLoanProductOrGLJ ?
                    <Link to={linkPath} >《{serviceAgreementName}》</Link> :
                    null
                }
                {
                    !isLoanProductOrGLJ ?
                    <br/> :
                    null
                }
                <Link to="serviceAgreement_loan_product" style={!isLoanProductOrGLJ ? {marginLeft:"42px"} : {}}>《借款协议》</Link>
            </div>
        </Group>
    );
};

ServiceAgreement.propTypes = {
    type:PropTypes.string
};

export default ServiceAgreement;