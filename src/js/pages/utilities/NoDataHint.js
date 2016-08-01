import React from "react";

// 暂时没有数据提示组件
//这是无状态组件，意在整个组件树更新的时候，跳过virtual DOM的diff比较，从而提高性能。
//为了避免一定程度的浪费，react官方还在0.14版本中加入了无状态组件
function NoDataHint(props){
    return (
        <div className="noReward-hint" style={{marginTop:"5rem"}}>
            <div className="text-center" >
                <img src="/src/img/reward_no.png" alt="" style={{width:"4rem",height:"4rem"}}/>
            </div>
            <div className="text-center" style={{marginTop:"0.4rem",color:"#999",fontSize:"0.875rem"}}>
                暂时没有相关数据！
            </div>
        </div>
    )
}

module.exports=NoDataHint;