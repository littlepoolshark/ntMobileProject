import React from "react";

let InvestmentRecord=React.createClass({
    _renderRecordList(){
        return (
            this.props.recordList.map(function(item,index){
                return (
                    <tr key={index}>
                        <td>{item.user}</td>
                        <td>{item.amount}</td>
                        <td>{item.date}</td>
                    </tr>
                )
            })
        )
    },
    render (){
        return (
            <table >
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
        )
    }
});

export default  InvestmentRecord;