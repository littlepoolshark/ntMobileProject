let InvestmentRecordStore=require("../../stores/InvestmentRecordStore");
let InvestmentRecordAction=require("../../actions/InvestmentRecordAction");
import React from "react";

let InvestmentRecord=React.createClass({
    _getAllDateFromStore(){
      return   InvestmentRecordStore.getAll();
    },
    getInitialState(){
        return this._getAllDateFromStore();
    },
    _renderRecordList(){
        let productType=this.props.type;
        return (
            this.state.list.map(function(item,index){
                return (
                    <tr key={productType + item.id}>
                        <td>{item.realName}</td>
                        <td>{item.inverstAmount}</td>
                        <td>{item.inverstTime}</td>
                    </tr>
                )
            })
        )
    },
    render (){
        return (
            <div>
                <table onScroll={this._handleScroll}>
                    <thead>
                    <tr>
                        <th>投资人</th>
                        <th>金额（元）</th>
                        <th>时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this._renderRecordList()}
                    </tbody>
                </table>
            </div>
        )
    },
    componentDidMount(){
        let {
            type,
            id
            }=this.props;
        InvestmentRecordAction.loadNextPage(type,id);

        InvestmentRecordStore.bind("change",function(){
            this.setState(this._getAllDateFromStore())
        }.bind(this));


    }
});

export default  InvestmentRecord;