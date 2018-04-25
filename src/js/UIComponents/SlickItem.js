import React, { Component, PropTypes, cloneElement } from 'react';


class SlickItem extends Component {
    constructor(props) {
        super(props);
        let {
            selfIndex,
            activeIndex,
            minImgHeight,
            maxImgHeight,
            } = this.props;

        this.state = {
            height: selfIndex === activeIndex ? maxImgHeight : minImgHeight,
            activeIndex
        }
    }

    render() {
        let {
            children,
            onLoad,
            childCounts,
            selfIndex,
            onClick
            } = this.props;

        let {
            activeIndex,
            height
            } = this.state;

        let isEdgeImg = selfIndex === activeIndex && ((activeIndex === childCounts - 2) || (activeIndex === 1))
        return (
            <li
                className={!isEdgeImg ? "animateFlag" : ""}
                style={{ height: height + "px" }}
                onClick={onClick}
            >
                {cloneElement(children, { onLoad , ...children.props})}
            </li>
        );
    }

    componentWillReceiveProps(nextProps) {

        let {
            selfIndex,
            activeIndex,
            minImgHeight,
            maxImgHeight
            } = nextProps;

        this.setState({
            activeIndex,
            height: selfIndex === activeIndex ? maxImgHeight : minImgHeight
        });

    }
}

SlickItem.propTypes = {
    children: PropTypes.node
};

export default SlickItem;