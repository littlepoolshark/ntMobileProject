import React from "react";
import Group from "../../UIComponents/Group";
import Grid from "../../UIComponents/Grid";
import Col from "../../UIComponents/Col";
import Icon from "../../UIComponents/Icon";

//数组去重
function removeDuplicatedItem(arr) {
  let newArr = [];
  if (arr.length > 1) {
    for (let i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i]) === -1) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  } else {
    return arr;
  }
}

// 应用于好采投，果乐金，车e贷产品详情中的认证信息模块
const AuthInfoList = props => {
  let {
    attachments //由证件编码（字符类型）组成的数组
  } = props;

  attachments = removeDuplicatedItem(attachments);

  let authInfoListMap = {
    "1": "借款人以及担保人身份证",
    "2": "结婚证",
    "3": "户口本",
    "4": "其他",
    "5": "担保机构相关",
    "6": "企业资质",
    "7": "担保人身份证",

    // 一下这几个证件都是车e贷项目所独有的
    "8": "车辆登记证",
    "9": "车辆照片",
    "10": "车辆抵押合同",
    "11": "保险单",
    "12": "购车发票"
  };

  return (
    <Group noPadded={false} className="authInfo-list">
      <h6>
        <span className="title-flag" />认证信息
      </h6>
      <div className="content">
        {attachments.length > 0 ? (
          <Grid wrap="wrap" collapse={true}>
            {attachments.map(function(item, index) {
              let colspan = index % 2 === 0 ? 4 : 2;
              return (
                <Col key={index + 1} cols={colspan}>
                  <Icon classPrefix="imgIcon" name="green-checkbox_checked" />
                  {authInfoListMap[item]}
                </Col>
              );
            })}
          </Grid>
        ) : null}
      </div>
    </Group>
  );
};

export default AuthInfoList;
