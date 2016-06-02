import React from 'react';
import {
  Container,
  Card,
} from 'amazeui-touch';

const header = (
  <Card.Child cover="http://lorempixel.com/1000/625/people/">
    <h3 className="card-title">
      Cover + 标题: 我思念的城市
    </h3>
  </Card.Child>
);
const footer = (
  <Card.Child role="footer">
    <a href="javascript: void(0)">Like</a>
    <a href="javascript: void(0)">Comment</a>
    <a href="javascript: void(0)">ReadMore</a>
  </Card.Child>
);

const CardExample = React.createClass({
  render() {
    return (
      <Container {...this.props}>
        <h3>简单的卡片</h3>

        <Card>
          怎能就让这不停燃烧的心，
          就这样耗尽消失在平庸里。
        </Card>

        <h3>标题</h3>

        <Card title="Card 标题">
          这是卡片内容。
        </Card>

        <h3>Card 头部、底部</h3>

        <Card
          header="Card header"
          footer="Card footer"
        >
          Card 内容
        </Card>

        <h3>自定义头部、底部</h3>

        <Card header={header}>
          风路过的时候  没能吹走 <br />
          这个城市太厚的灰尘 <br />
          多少次的雨水  从来没有 <br />
          冲掉你那沉重的忧伤 <br />
          你的忧伤  像我的绝望 <br />
          那样漫长
        </Card>

        <Card
          title="Card 标题"
          footer={footer}
        >
          <p>Card 内容</p>
        </Card>
      </Container>
    );
  }
});

export default CardExample;
