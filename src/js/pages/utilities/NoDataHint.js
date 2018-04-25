require("../../../scss/page/NoDataHint.scss");
import React from "react";

// 暂时没有数据提示组件
//这是无状态组件，意在整个组件树更新的时候，跳过virtual DOM的diff比较，从而提高性能。
//为了避免一定程度的浪费，react官方还在0.14版本中加入了无状态组件
function NoDataHint(props){
    return (
        <div className="noData-hint"  {...props}>
            <div className="text-center img-wrapper" >
                {
                    props.children ?
                    props.children :
                    <img src={require("../../../img/reward_no.png")} alt="" />
                }

            </div>
            <div className="text-center text-hint" >
                暂时没有相关数据
            </div>
        </div>
    )
}

module.exports=NoDataHint;