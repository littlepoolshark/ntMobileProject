import React from 'react';
import {
  Container,
  Grid,
  Col,
  Icon,
} from 'amazeui-touch';

const icons = ['back', 'bars', 'caret', 'check', 'close', 'code', 'compose', 'download', 'edit', 'forward', 'gear', 'home', 'info', 'list', 'more-vertical', 'more', 'pages', 'pause', 'person', 'play', 'plus', 'refresh', 'search', 'share', 'sound', 'sound2', 'sound3', 'sound4', 'star-filled', 'star', 'stop', 'trash', 'up-nav', 'up', 'right-nav', 'right', 'down-nav', 'down', 'left-nav', 'left'];

const IconExample = React.createClass({
  render() {
    return (
      <Container {...this.props}>
        <Grid avg={4} className="sk-icons text-center">
          {
            icons.map((icon, i) => {
              return (
                <Col key={i}>
                  <Icon name={icon} key={i}></Icon>
                  <div className="sk-icon-name text-truncate">
                    {icon}
                  </div>
                </Col>
              );
            })
          }
        </Grid>
        <br />
        <br />
      </Container>
    );
  }
});

export default IconExample;
