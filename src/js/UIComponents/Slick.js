//@flow
import React, { Component, PropTypes } from 'react';
import Hammer from 'hammerjs';

const SIDE_MARGIN = 40;
const ZOOM_RATE = 1.2;

class Slick extends Component {
    props: {
        defaultIndex: number,
        durationTime: string,
        isAutoPlay: boolean,
        iShowDot: boolean
    }

    static defaultProps = {
        defaultIndex: 1,
        durationTime: "0.5s",
        isAutoPlay: true,
        iShowDot: false
    }

    state: {
        activeIndex: number,
        isAnimating: boolean,
        screenWidth: number,
        isWindowResized: boolean,
        originImgHeight:number,
        direction:string
    }

    constructor(props: Object) {
        super(props);
        this.state = {
            activeIndex: props.defaultIndex || 1,
            isAnimating: false,
            screenWidth: (window.screen.width || document.documentElement.clientWidth) - SIDE_MARGIN * 2,//获取视口宽度的兼容性写法
            isWindowResized: false,
            originImgHeight:100,
            direction:"left"
        };
    }

    _goPrev() {
        this._enableAnimation();
        this.setState((prevState, prevProps) => {
            return {
                activeIndex: prevState.activeIndex - 1,
                isAnimating: true,
                direction:"right"
            }
        });
    }

    _goNext() {
        this._enableAnimation();
        this.setState((prevState, prevProps) => {
            return {
                activeIndex: prevState.activeIndex + 1,
                isAnimating: true,
                direction:"left"
            }
        });
    }

    _autoPlay() {
        this.timer = setInterval(() => {
            this._goNext();
        }, 4000);
    }

    _enableAnimation() {
        let className: string = this.refs.sliderWrapper.className;
        if (className.indexOf("animate") === -1) {
            this.refs.sliderWrapper.className += " animate";
        };
    }

    _disableAnimation() {
        let className: string = this.refs.sliderWrapper.className;
        if (className.indexOf("animate") > -1) {
            this.refs.sliderWrapper.className = className.replace('animate', '').trim();
        };
    }

    _recover() {
        let nextTranslateX = this.state.activeIndex * (-this.state.screenWidth) + SIDE_MARGIN;
        this._setTranslateXTo(nextTranslateX);
    }

    _setSlickItemWidth() {
        let lis = this.refs.sliderWrapper.getElementsByTagName("li");
        Array.prototype.map.call(lis, (ele, index) => {
            ele.style.width = this.state.screenWidth + "px";
        })
    }

    _updateSlickItemHeight(direction: string) {
        let lis = this.refs.sliderWrapper.getElementsByTagName("li");
        let activeIndex = this.state.activeIndex;
        let li_active = lis[activeIndex];
        let li_prev = lis[activeIndex - 1];
        let li_next = lis[activeIndex + 1];
        let li_active_sibling = direction === "right" ? li_prev : li_next;
        const MIN_IMG_HEIGHT=this.state.originImgHeight;
        const MAX_IMG_HEIGHT=parseInt((MIN_IMG_HEIGHT  * ZOOM_RATE).toFixed(0));

        let li_activeHeight = li_active.offsetHeight;
        let li_active_siblingHeight = li_active_sibling.offsetHeight;

        if (li_activeHeight - 1 >= MIN_IMG_HEIGHT) {
            li_active.style.height = li_activeHeight - 1 + "px";
        }

        if (li_active_siblingHeight + 1 <= MAX_IMG_HEIGHT) {
            li_active_sibling.style.height = li_active_siblingHeight + 1 + "px";
        }
    }

    _handleTransitionEnd() {
        let childrenCount = this.props.children.length + 2;

        this._disableAnimation();
        if (this.state.activeIndex === 0) {
            this.setState({
                activeIndex: childrenCount - 2
            }, () => {
                this.setState({
                    isAnimating: false
                }, () => {
                    if (!this.timer && this.props.isAutoPlay) {
                        this._autoPlay();
                    }
                })
            });
        } else if (this.state.activeIndex === (childrenCount - 1)) {
            this.setState({
                activeIndex: 1
            }, () => {
                this.setState({
                    isAnimating: false
                }, () => {
                    if (!this.timer && this.props.isAutoPlay) {
                        this._autoPlay();
                    }
                })
            });
        } else {
            this.setState({
                isAnimating: false
            }, () => {
                if (!this.timer && this.props.isAutoPlay) {
                    this._autoPlay();
                }
            });
        }
    }

    _getCurrentTranslateX(): number {
        let transfromStr: string = this.refs.sliderWrapper.style.transform;
        let indexOfLeftBrace: number = transfromStr.indexOf("(");
        let prevTranslateX: number = parseInt(transfromStr.slice(indexOfLeftBrace + 1, -1).split(",")[0]);
        return prevTranslateX;
    }

    _setTranslateXTo(translateX: number) {
        this.refs.sliderWrapper.style.transform = `translate3d(${translateX}px,0,0)`;
        this.refs.sliderWrapper.style.webkitTransform = `translate3d(${translateX}px,0,0)`;
    }

    _setScreenWidth() {
        this.setState({
            screenWidth: window.screen.width || document.documentElement.clientWidth,
            isWindowResized: true
        })
    }

    getImgScaleAfterLoaded = (event: Object) => { 
        let originImgHeight=event.target.offsetHeight;
        this.refs.sliderWrapper.style.height=originImgHeight * ZOOM_RATE + "px";//给容器设置固定高度，解决图片变大变小过程中的由于页面高度变化而导致的抖动

        this.setState(prevState => {
            return {
                originImgHeight
            }
        })
    }

    render() {

        let childrenCount = React.Children.count(this.props.children);
        let isHasChild = childrenCount > 0;
        let transformX = isHasChild ?  this.state.activeIndex * (-this.state.screenWidth) + SIDE_MARGIN : 0 ;

        let sliderWrapperStyle = {
            transform: `translate3d(${transformX}px,0,0)`,
            "webkitTransform": `translate3d(${transformX}px,0,0)`,
            "WebkitTransform": `translate3d(${transformX}px,0,0)`,
            width: isHasChild ?  `${this.state.screenWidth * (childrenCount + 2)}px` : `${this.state.screenWidth}px`
        };

        let oldChildren=this.props.children;
        let newChildren = [];
        if(isHasChild){//在原有子节点上首尾更复制追加一个子节点来实现无缝循环的需求。
            const MIN_IMG_HEIGHT=this.state.originImgHeight;
            let propsNeedToPass={
                activeIndex:this.state.activeIndex,
                direction:this.state.direction,
                minImgHeight:MIN_IMG_HEIGHT,
                maxImgHeight:parseInt((MIN_IMG_HEIGHT  * ZOOM_RATE).toFixed(0)),
                childCounts:childrenCount + 2
            };

            let firstChild_old=childrenCount === 1 ?  oldChildren : oldChildren[childrenCount - 1];
            let lastChild_old=childrenCount === 1 ?  oldChildren : oldChildren[0];

            let firstChild=React.cloneElement(
                firstChild_old, 
                {  
                    ...firstChild_old.props,
                    onLoad: this.getImgScaleAfterLoaded,
                    selfIndex:0, 
                    ...propsNeedToPass 
                }
            );
            let lastChild=React.cloneElement(
                lastChild_old,
                { 
                    ...lastChild_old.props,
                    selfIndex:childrenCount + 1,
                     ...propsNeedToPass
                }
            );
            let oldChildrenWithProps=React.Children.map(oldChildren,(child) => {
                return React.cloneElement(child,{ ...child.props, ...propsNeedToPass})
            });
           
            newChildren=[firstChild,...oldChildrenWithProps,lastChild];
        }
        

        return (
            <div className="slider-container">
                <ul
                    className="slider-wrapper"
                    ref="sliderWrapper"
                    style={sliderWrapperStyle}
                    onTransitionEnd={(e) => { this._handleTransitionEnd() }}
                >
                    {newChildren}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this._setSlickItemWidth();

        if (React.Children.count(this.props.children) !== 1) {

            if (this.props.isAutoPlay) {
                this._autoPlay();
            }

            this.hammertime = new Hammer(this.refs.sliderWrapper);
            this.hammertime.get('pan').set({ threshold: 10, direction: Hammer.DIRECTION_HORIZONTAL });

            this.hammertime.on("panstart", (e: Object) => {
                if (this.state.isAnimating) return;
                this._disableAnimation();
                let prevTranslateX: number = this._getCurrentTranslateX();
                this.currTranslateX = prevTranslateX + e.deltaX;
            });

            this.hammertime.on("panmove", (e) => {
                if (this.state.isAnimating) return;
                if (!!this.timer) {
                    window.clearInterval(this.timer);
                    this.timer = null;
                };
                let nextTranslateX: number = this.currTranslateX + e.deltaX;
                this._setTranslateXTo(nextTranslateX);

                // 暂时不做跟随触点而放大放小的效果
                // if(e.additionalEvent === "panright"){
                //     this._updateSlickItemHeight("right");
                // }else if (e.additionalEvent === "panleft"){
                //     this._updateSlickItemHeight("left");
                // }else {
                //     this._updateSlickItemHeight(e.deltaX > 0 ? "right" : "left");
                // }
                
            });

            this.hammertime.on("panend pancancel", (e: Object) => {
                if (this.state.isAnimating) return;
                this._enableAnimation();
                let precent: number = (Math.abs(this._getCurrentTranslateX() - this.currTranslateX) + 10) * 100 / this.state.screenWidth;

                if (e.deltaX < 0) {
                    if (precent > 20) {
                        this._goNext();
                    } else {
                        this._recover();
                    }
                } else {
                    if (precent > 20) {
                        this._goPrev();
                    } else {
                        this._recover();
                    }
                }
            });
        }

        window.addEventListener("resize", this._setScreenWidth.bind(this), false);

    }

    componentWillUnmount() {
        this.hammertime = null;
        this.currTranslateX = null;
        this.timer && clearInterval(this.timer);
        window.removeEventListener("resize", this._setScreenWidth.bind(this), false);
    }

    componentDidUpdate() {
        if (this.state.isWindowResized) {
            this._setSlickItemWidth();
        }
    }
}




export default Slick;
