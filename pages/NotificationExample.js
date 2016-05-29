import React from 'react';
import {
  Container,
  Group,
  Notification,
  Button,
  Field,
} from 'amazeui-touch';

const NotificationExample = React.createClass({
  getInitialState() {
    return {
      visible: false,
      amStyle: '',
    };
  },

  openNotification() {
    this.setState({
      visible: true,
      amStyle: this.refs.barStyle.getValue()
    });
  },

  closeNotification() {
    this.setState({
      visible: false
    });
  },

  render() {
    return (
      <Container {...this.props}>
        <Group
          header="交互显示"
        >
          <Field
            type="select"
            label="选择通知栏颜色"
            defaultValue=""
            ref="barStyle"
          >
            <option value="">Default</option>
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="alert">Alert</option>
          </Field>

          <Button
            onClick={this.openNotification}
            disabled={this.state.visible}
            amStyle="primary"
          >
            显示通知栏
          </Button>

          <Button
            onClick={this.closeNotification}
            disabled={!this.state.visible}
            amStyle="alert"
          >
            关闭通知栏
          </Button>
        </Group>
        <Notification
          title="测试标题"
          amStyle={this.state.amStyle}
          visible={this.state.visible}
          animated
          onDismiss={this.closeNotification}
        >
          这是一个动态显示的通知 :)
        </Notification>

        <Group
          header="静态通知栏样式展示"
        >
          <Notification visible static>这是一个通知 :)</Notification>
          <Notification visible static amStyle="primary">这是一个通知 :)</Notification>
          <Notification visible static amStyle="secondary">这是一个通知 :)</Notification>
          <Notification visible static amStyle="success">这是一个通知 :)</Notification>
          <Notification visible static amStyle="warning">这是一个通知 :)</Notification>
          <Notification visible static amStyle="alert">这是一个通知 :)</Notification>
        </Group>
      </Container>
    );
  }
});

export default NotificationExample;
