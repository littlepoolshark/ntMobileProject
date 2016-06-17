import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

const Icon = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    component: React.PropTypes.node.isRequired,
    name: React.PropTypes.string.isRequired,
    href: React.PropTypes.string,
    // amStyle: React.PropTypes.string,
    // button: React.PropTypes.bool,
    // size: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      classPrefix: 'icon',
      component: 'span'
    };
  },

  render() {
    let classSet = this.getClassSet();
    let {
      component: Component,
      className,
      href,
      name,
      ...props
    } = this.props;
    Component = href ? 'a' : Component;

    // icon-[iconName]
    classSet[this.prefixClass(name)] = true;
    
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

export default Icon;
