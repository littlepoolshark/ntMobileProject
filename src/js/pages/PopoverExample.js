import React from 'react';
import {
  Container,
  Group,
  Button,
  Popover,
  PopoverTrigger,
  Field,
  List,
} from 'amazeui-touch';

const PopoverExample = React.createClass({
  render() {
    return (
      <Container {...this.props}>

        <Group
          header="默认"
        >
          <PopoverTrigger popover={<Popover><p>Popover 内容</p></Popover>}>
            <Button amStyle="primary">显示 Popover</Button>
          </PopoverTrigger>
        </Group>
      </Container>
    );
  }
});

export default PopoverExample;
