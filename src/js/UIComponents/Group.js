import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

let Group = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    component: React.PropTypes.node.isRequired,
    header: React.PropTypes.node,
    footer: React.PropTypes.node,
    noPadded: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'group',
      component: 'div'
    };
  },

  renderAddon(role) {
    role = role || 'header';
    return this.props[role] ?
      React.createElement(role, {
        className: this.prefixClass(role)
      }, this.props[role]) : null;
  },

  render() {
    let {
      component: Component,
      className,
      header,
      footer,
      noPadded,
      ...props,
    } = this.props;
    let classSet = this.getClassSet();
    classSet[this.prefixClass('no-padded')] = noPadded;

    let bodyClasses = {
      [this.prefixClass('body')]: true,
    };

    return (
      <Component
        {...props}
        className={classNames(className, classSet)}
      >
        {this.renderAddon('header')}
        <div className={classNames(bodyClasses)}>
          {this.props.children}
        </div>
        {this.renderAddon('footer')}
      </Component>
    );
  }
});

export default Group;
