import React, {cloneElement} from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

const ButtonGroup = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    amStyle: React.PropTypes.string,
    amSize: React.PropTypes.string,
    hollow: React.PropTypes.bool,
    justify: React.PropTypes.bool,
    stacked: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'btn-group',
    };
  },

  render() {
    let classSet = this.getClassSet();
    let {
      className,
      amStyle,
      amSize,
      hollow,
      stacked,
      justify,
      ...props
    } = this.props;

    classSet[this.prefixClass('stacked')] = stacked;
    classSet[this.prefixClass('justify')] = justify;

    return (
      <div
        {...props}
        className={classNames(className, classSet)}
      >
        {React.Children.map(this.props.children, (child, i) => {
          return cloneElement(child, Object.assign({
            amStyle,
            amSize,
            hollow,
          }, child.props));
        })}
      </div>
    );
  }
});

export default ButtonGroup;
