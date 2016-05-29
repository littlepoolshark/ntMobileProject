import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

const Grid = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    component: React.PropTypes.node.isRequired,
    collapse: React.PropTypes.bool,
    avg: React.PropTypes.number,
    align: React.PropTypes.oneOf(['right', 'center', 'between', 'around']),
  },

  getDefaultProps() {
    return {
      classPrefix: 'g',
      component: 'div',
    };
  },

  render: function() {
    let classSet = this.getClassSet();
    let {
      component: Component,
      collapse,
      className,
      avg,
      align,
      ...props
    } = this.props;

    // .g-collapse
    classSet[this.prefixClass('collapse')] = collapse;

    if (avg) {
      classSet[this.prefixClass('avg-' + avg)] = true;
    }

    if (align) {
      classSet[this.prefixClass(align)] = true;
    }

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

export default Grid;
