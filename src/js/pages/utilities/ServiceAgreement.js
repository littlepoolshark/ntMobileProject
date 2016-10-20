import React from "react";
import {Link} from "react-router";
import Group from "../../UIComponents/Group";

import config from "../../config";


// 服务协议组件
//这是无状态组件，意在整个组件树更新的时候，跳过virtual DOM的diff比较，从而提高性能。
//为了避免一定程度的浪费，react官方还在0.14版本中加入了无状态组件
function ServiceAgreement(props){
    let linkPath="serviceAgreement_"+props.type;
    let serviceAgreementName="农泰金融" + config.productNameMap[props.type] + "服务协议";
    return (
        <Group>
            <h6>服务协议</h6>
            <div className="content">
                <input type="checkbox" defaultChecked  disabled/>
                同意
                <Link to={linkPath}>《{serviceAgreementName}》</Link>
            </div>
        </Group>
    )
}

export  default ServiceAgreement;