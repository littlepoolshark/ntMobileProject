import React from "react";
import { Link } from "react-router";
import Group from "../../UIComponents/Group";

// 风险告知组件
//这是无状态组件，意在整个组件树更新的时候，跳过virtual DOM的diff比较，从而提高性能。
//为了避免一定程度的浪费，react官方还在0.14版本中加入了无状态组件
function RiskAnnounce(props){
    return (
        <Group noPadded={false} >
            <h6><span className="title-flag"></span>风险告知</h6>
            <Link to="serviceAgreement_risk_announce"  style={{marginLeft:"-10px",fontSize:"14px"}}>《风险提示告知书》</Link>
        </Group>
    )
}

module.exports=RiskAnnounce;