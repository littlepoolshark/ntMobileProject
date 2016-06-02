import React from 'react';
import {
  Link,
} from 'react-router';
import {
  Container,
  Group,
  Button,
  OffCanvas,
  OffCanvasTrigger,
  List,
} from 'amazeui-touch';

const OffCanvasExample = React.createClass({
  onDismiss(e) {
    // 从 OffCanvas 内部元素关闭 OffCanvas
    // 紧耦合，需要重构 OffCanvas
    this.refs.oct.close();
  },

  renderOC() {
    return (
      <OffCanvas>
        <div>
          <h3 className="margin">OffCanvas 内容</h3>
          <p className="margin-h">在 OffCanvas 内放置 React Router Link 演示</p>
          <List>
            <List.Item
              linkComponent={Link}
              linkProps={{
                to: `/`,
                onClick: this.onDismiss,
              }}
              title="组件"
            />
            <List.Item
              linkComponent={Link}
              linkProps={{
                to: '/about',
                onClick: this.onDismiss,
              }}
              title="关于"
            />
            <List.Item
              href="https://github.com/amazeui/amazeui-touch"
              title="GitHub"
              target="_blank"
              onClick={this.onDismiss}
            />
          </List>
        </div>
      </OffCanvas>
    )
  },

  render() {
    return (
      <Container {...this.props}>
        <h2>Overlay</h2>

        <Group
          header="左侧显示 OffCanvas"
        >
          <OffCanvasTrigger
            ref="oct"
            offCanvas={this.renderOC()}
          >
            <Button amStyle="primary">显示左侧 Offcanvas</Button>
          </OffCanvasTrigger>
        </Group>

        <Group
          header="右侧显示 OffCanvas"
        >
          <OffCanvasTrigger
            placement="right"
            offCanvas={<OffCanvas><p>右侧边栏 OffCanvas 内容</p></OffCanvas>}
          >
            <Button amStyle="secondary">显示右侧 Offcanvas</Button>
          </OffCanvasTrigger>
        </Group>

        <h2>Push</h2>

        <Group
          header="右侧显示 OffCanvas"
        >
          <OffCanvasTrigger
            animation="push"
            pageContainer="#sk-root"
            offCanvas={<OffCanvas><p>OffCanvas 内容</p></OffCanvas>}
          >
            <Button amStyle="primary">显示左侧 Offcanvas</Button>
          </OffCanvasTrigger>
        </Group>

        <Group
          header="右侧显示 OffCanvas"
        >
          <OffCanvasTrigger
            animation="push"
            pageContainer="#sk-root"
            placement="right"
            offCanvas={<OffCanvas><p>右侧边栏 OffCanvas 内容</p></OffCanvas>}
          >
            <Button amStyle="secondary">显示右侧 Offcanvas</Button>
          </OffCanvasTrigger>
        </Group>
      </Container>
    );
  }
});

export default OffCanvasExample;
