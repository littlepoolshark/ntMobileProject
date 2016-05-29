import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

const Loader = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string,
    component: React.PropTypes.node,
    amStyle: React.PropTypes.string,
    rounded: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'loader',
      component: 'div',
    };
  },

  render() {
    let classSet = this.getClassSet();
    const {
      className,
      component: Component,
      ...props,
    } = this.props;

    return (
      <Component
        {...props}
        className={classNames(classSet, className)}
      >
        <div className={this.prefixClass('bounce1')} />
        <div className={this.prefixClass('bounce2')} />
        <div className={this.prefixClass('bounce3')} />
      </Component>
    )
  }
});

export default Loader;
