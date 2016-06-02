import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

const Badge = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    component: React.PropTypes.node.isRequired,
    href: React.PropTypes.string,
    amStyle: React.PropTypes.string,
    // radius: React.PropTypes.bool,
    rounded: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'badge',
      component: 'span'
    };
  },

  render() {
    let classSet = this.getClassSet();
    let {
      component: Component,
      className,
      href,
      ...props
    } = this.props;
    Component = href ? 'a' : Component;

    return (
      <Component
        {...props}
        className={classNames(classSet, className)}
      >
        {this.props.children}
      </Component>
    );
  }
});

export default Badge;
