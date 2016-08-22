import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

let microEvent=require("../lib/microevent");
let pubsub={};
microEvent.mixin(pubsub);

const Loader = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string,
    component: React.PropTypes.node,
    amStyle: React.PropTypes.string,
    rounded: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'loader',
      component: 'div',
    };
  },

  getInitialState(){
    return {
      loading:true,
      showHint:false
    }
  },

  render() {
    let classSet = this.getClassSet();
    const {
      className,
      component: Component,
      ...props,
    } = this.props;

    return (
        <div>
          {
            this.state.showHint ?
              (
                  <div className="noMoreData-hint" style={{margin:"15px 0"}}>没有更多数据了！</div>
              ) :
              (
                  <Component
                      {...props}
                      className={classNames(classSet, className,this.state.loading ? "" : "hide")}
                      >
                      <div className={this.prefixClass('bounce1')} />
                      <div className={this.prefixClass('bounce2')} />
                      <div className={this.prefixClass('bounce3')} />
                  </Component>
              )
          }

        </div>

    )
  },
  componentDidMount(){
    pubsub.bind("loader.loading",function(){
      this.setState({
        loading:true,
        showHint:false
      })
    }.bind(this));

    pubsub.bind("loader.loaded",function(){
      this.setState({
        loading:false
      })
    }.bind(this));

    pubsub.bind("loader.toggleToNoMoreDataHint",function(){
      this.setState({
        loading:false,
        showHint:true
      })
    }.bind(this));


  }
});

Loader.show=function(){
  pubsub.trigger("loader.loading");
};

Loader.hide=function(){
  pubsub.trigger("loader.loaded");
};

Loader.toggle=function(){
  pubsub.trigger("loader.toggleToNoMoreDataHint");
}

export default Loader;
