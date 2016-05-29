import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import BackdropMixin from './mixins/BackdropMixin';

const Popover = React.createClass({
  mixins: [ClassNameMixin, BackdropMixin],

  propTypes: {
    classPrefix: React.PropTypes.string,
    placement: React.PropTypes.oneOf(['top', 'bottom', 'horizontal']),
    positionLeft: React.PropTypes.number,
    positionTop: React.PropTypes.number,
    angleLeft: React.PropTypes.number,
    angleTop: React.PropTypes.number,
    anglePosition: React.PropTypes.string,
    onDismiss: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      classPrefix: 'popover',
    };
  },

  handleBackdropClick(e) {
    if (e && e.target === this.refs.backdrop) {
      let {
        onDismiss,
      } = this.props;

      onDismiss && onDismiss();
    }
  },

  render() {
    let classSet = this.getClassSet();
    let {
      className,
      children,
      positionLeft,
      positionTop,
      angleLeft,
      angleTop,
      anglePosition,
      isClosing,
      placement,
      ...props
    } = this.props;
    let style = {
      left: positionLeft,
      top: positionTop,
    };
    let angleStyle = {
      left: angleLeft,
      top: angleTop,
    };

    classSet[this.prefixClass('out')] = isClosing;
    classSet[this.prefixClass(placement)] = placement;

    let popover = (
      <div
        {...props}
        style={style}
        ref="overlay"
        className={classNames(classSet, className)}
      >
        <div className={this.prefixClass('inner')}>
          {children}
        </div>
        <div
          style={angleStyle}
          className={classNames(this.prefixClass('angle'),
          anglePosition ? this.prefixClass('angle-' + anglePosition) : null
          )}
        />
      </div>
    );

    return this.renderBackdrop(popover);
  }
});

export default Popover;
