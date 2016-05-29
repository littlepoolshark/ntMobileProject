import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

const Col = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    component: React.PropTypes.node.isRequired,
    cols: React.PropTypes.number,
    offset: React.PropTypes.number,
    shrink: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'col',
      component: 'div'
    };
  },

  render() {
    let {
      cols,
      offset,
      shrink,
      component: Component,
      className,
      ...props,
    } = this.props;
    let classSet = this.getClassSet();

    if (cols) {
      classSet[this.prefixClass(cols)] = true;
    }

    if (offset) {
      classSet[this.prefixClass('offset-' + offset)] = true;
    }

    classSet[this.prefixClass('shrink')] = shrink;

    return (
      <Component
        {...props}
        className={classNames(className, classSet)}
      >
        {this.props.children}
      </Component>
    );
  }
});

export default Col;
