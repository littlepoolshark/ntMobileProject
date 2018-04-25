import "../../scss/page/AutoPurchaseType.scss";
import React, { Component, PropTypes } from 'react';
import classNames from "classnames";
import Container from "../UIComponents/Container";
import NavBar from "../UIComponents/NavBar";
import Group from "../UIComponents/Group";
import Button from "../UIComponents/Button";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";

const productTypeMap = {
    "1": "月月赚",
    "2": "季季赚",
    "3": "月满盈",
    "4": "丰收盈",
    "5": "好采投",
    "6": "债权转让"
};

const ProductTypeCell = (props) => {
    let {
        typeIndex,
        iSelected,
        onToggle
    } = props;

    let colClass=classNames({
        typeCell:true,
        iSelected:iSelected
    });

    return (
        <Col cols={3} onClick={onToggle} >
            <div className={colClass}>{productTypeMap[typeIndex]}</div>
        </Col>
    );
};

ProductTypeCell.propTypes = {
    typeIndex: PropTypes.string.isRequired,
    iSelected: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};


class AutoPurchaseType extends Component {

    constructor(props){
        super(props);
        let productType = this.props.location.state.productType;

        this.state={
            selectedTypeList:productType
        }
    }

    _handleNavBarClick= ({title}) => {
        if(title === "返回"){
            this.context.router.push({
                pathname:"autoPurchaseForm",
                query:{
                    actionType:this.props.location.query.actionType
                },
                state:this.props.location.state
            });
        }else{
            this._selectAll();
        }
    }

    _selectAll= () => {
        this.setState({
            selectedTypeList:["1","2","3","4","5","6"]
        })
    }

    _handleSubmitSelectedType = () => {
        let originFormData=this.props.location.state;

        this.context.router.push({
            pathname:"autoPurchaseForm",
            query:{
                actionType:this.props.location.query.actionType
            },
            state:Object.assign(
                {},
                originFormData,
                {
                    productType:this.state.selectedTypeList
                }
            )
        })
    }

    _handleSelectToggle = (typeIndex) => {
        let iSelected=this.state.selectedTypeList.indexOf(typeIndex) > -1;
        if(iSelected){
            this.setState({
                selectedTypeList:this.state.selectedTypeList.filter((item,index) => {
                    return item !== typeIndex;
                })
            })
        }else {
              this.setState({
                selectedTypeList:[...this.state.selectedTypeList,typeIndex]
            })
        }
    }

    render() {
        return (
            <Container id="autoPurchaseType">
                <NavBar
                    title="投资类型"
                    leftNav={[{ title: "返回", icon: "left-nav" }]}
                    rightNav={[{ title: "全选" }]}
                    onAction={this._handleNavBarClick}
                    amStyle="primary"
                />
                <Group>
                    <Grid wrap="wrap">
                        {
                            ["1","2","3","4","5","6"].map((item,index) => {
                                let iSelected=this.state.selectedTypeList.indexOf(item) > -1;
                                return (
                                    <ProductTypeCell 
                                        key={item}
                                        typeIndex={item} 
                                        iSelected={iSelected} 
                                        onToggle={this._handleSelectToggle.bind(this,item)}
                                    />
                                )
                            })
                        }
                    </Grid>
                </Group>
                <div className="" style={{ padding: "1rem 0.9375rem 0" }}>
                    <Button amStyle="primary" block radius={true} onClick={this._handleSubmitSelectedType}>保存</Button>
                </div>
            </Container>
        );
    }
}

AutoPurchaseType.contextTypes = {
    router: PropTypes.object.isRequired
};

module.exports = AutoPurchaseType;