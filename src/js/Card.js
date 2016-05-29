import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

const Card = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    header: React.PropTypes.node,
    footer: React.PropTypes.node,
  },

  getDefaultProps() {
    return {
      classPrefix: 'card',
    };
  },

  renderItem(element, role) {
    if (!element) {
      return null;
    }

    return (element.type && element.type === Card.Child) ?
      element : <Card.Child role={role}>{element}</Card.Child>;
  },

  renderTitle(title) {
    return (
      <h2 className={this.prefixClass('title')}>
        {title}
      </h2>
    );
  },

  render() {
    let classSet = this.getClassSet();
    let {
      children,
      className,
      title,
      header,
      footer,
      ...props
    } = this.props;

    return (
      <div
        {...props}
        className={classNames(classSet, className)}
      >
        {title ?
          this.renderItem(this.renderTitle(title)) : this.renderItem(header)}

        <div className={this.prefixClass('body')}>
          {children}
        </div>

        {this.renderItem(footer, 'footer')}
      </div>
    );
  }
});

Card.Child = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    role: React.PropTypes.oneOf(['header', 'footer']),
    cover: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      classPrefix: 'card',
      role: 'header'
    };
  },

  render() {
    const {
      role,
      className,
      cover,
      ...props
    } = this.props;
    let classSet = {
      className,
      [this.prefixClass(role)]: true,
      [this.prefixClass('cover')]: cover,
    };
    let style = null;

    if (cover) {
      style = {
        backgroundImage: 'url(' + cover + ')',
      }
    }

    return (
      <div
        {...props}
        className={classNames(classSet)}
        style={style}
      >
        {this.props.children}
      </div>
    );
  }
});

export default Card;
