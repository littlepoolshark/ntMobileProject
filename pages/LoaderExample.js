import React from 'react';
import {
  Container,
  Group,
  Loader,
  Field,
} from 'amazeui-touch';

const LoaderExample = React.createClass({
  getInitialState() {
    return {
      amStyle: '',
      rounded: false,
    };
  },

  handleChange() {
    this.setState({
      amStyle: this.refs.amStyle.getValue(),
      rounded: !!this.refs.amShape.getValue(),
    });
  },

  render() {
    const {
      amStyle,
      } = this.state;
    let style = {};

    if (amStyle === 'white') {
      style = {
        background: '#0e90d2',
        display: 'block',
      }
    }

    return (
      <Container {...this.props}>
        <Group
          header="Loader 演示"
        >
          <div style={style}>
            <Loader {...this.state} />
          </div>
          <hr />
          <Field
            type="select"
            label="颜色"
            ref="amStyle"
            onChange={this.handleChange}
          >
            <option value="">default</option>
            <option value="primary">primary</option>
            <option value="secondary">secondary</option>
            <option value="success">success</option>
            <option value="warning">warning</option>
            <option value="alert">alert</option>
            <option value="dark">dark</option>
            <option value="white">white</option>
          </Field>
          <Field
            onChange={this.handleChange}
            type="select"
            label="形状"
            ref="amShape"
          >
            <option value="">default (square)</option>
            <option value="rounded">rounded</option>
          </Field>
        </Group>
      </Container>
    );
  }
});

export default LoaderExample;
