require('../../../scss/page/CommonCardWrapper.scss');
import React from 'react';

import Group from '../../UIComponents/Group';
import Icon from '../../UIComponents/Icon';

function ProductListCardWrapper(props) {
  let mapTypeToIconName = {
    dqList: 'dqlc',
    hqList: 'lhlc',
    xsList: 'xslc',
    moonList: 'wylc',
    transferList: 'zzlc'
  };
  let mapTypeToTitle = {
    dqList: '定期投资',
    hqList: '灵活投资 • 天天赚',
    xsList: (
      <span>
        新手专享 • 新手标<span className="newbie-tag">仅限一次</span>
      </span>
    ),
    moonList: '稳赢计划',
    transferList: '债权转让'
  };

  //于2018/03/19,下架了天天赚，月月赚，季季赚，月满盈和丰收盈等产品
  if (['hqList', 'moonList'].indexOf(props.type) > -1) {
    return null;
  }

  return (
    <Group className="commonCard-wrapper" noPadded={true}>
      <h1>
        <Icon classPrefix="imgIcon" name={mapTypeToIconName[props.type]} />
        <span>{mapTypeToTitle[props.type]}</span>
      </h1>
      {props.children}
    </Group>
  );
}

export default ProductListCardWrapper;
