//export About from './About';
//export Default from './Default';

// Components
//export Accordion from './AccordionExample';
// export Badge from './BadgeExample';
// export Button from './ButtonExample';
// export Card from './CardExample';
// export Form from './FormExample';
// export Grid from './GridExample';
// export List from './ListExample';
// export Loader from './LoaderExample';
// export Modal from './ModalExample';
// export Navbar from './NavBarExample';
// export Notification from './NotificationExample';
// export Icon from './IconExample';
// export Offcanvas from './OffCanvasExample';
// export Popover from './PopoverExample';
// export Slider from './SliderExample';
// export Tabbar from './TabBarExample';
// export Tabs from './TabsExample';
// export Typography from './TypographyExample';


import React from "react";
import Container from "../UIComponents/Container";
import View from "../UIComponents/View";
import NavBar from "../UIComponents/NavBar";
import Button from "../UIComponents/Button";
import Field from "../UIComponents/Field";
import List from "../UIComponents/List";
import Icon from "../UIComponents/Icon";
import Modal from "../UIComponents/modal/Modal";
import Slider from "../UIComponents/Slider";
import Group from "../UIComponents/Group";
import Grid from "../UIComponents/Grid";
import Col from "../UIComponents/Col";


//默认登录页面:Default component
export const Default=React.createClass({
	handleLogin(){
		let account=this.refs.account.getValue();
		let password=this.refs.password.getValue();
		if( account !== "13682330541" || password !== "123456" ){
			this.refs.modal.open();
		}else {
			//'props.history' and 'context.history' had been deprecated. please use 'context.router'
			// method pushState had been deprecated.please use push instead
			this.props.history.pushState(null,"/index");
		}

	},
	handleCloseModal(){
		this.refs.modal.close();
	},
	render (){
		return (
			<View id="app-index">
		        <NavBar
		          amStyle="primary"
		          title="登录"
		        />
		        <Container scrollable>
		        	<div style={{marginTop:"80px"}}>
		        		<List>
		        			<List.Item
								media={<Icon name="person" />}
			                  	nested="input"
			                >
			                  <Field type="text" label={null} placeholder="请输入您的手机号码" ref="account"></Field>
                			</List.Item>

		        			<List.Item
								media={<Icon name="info" />}
								nested="input"
			                >
			                	<Field type="text" label={null} placeholder="请输入您的登录密码" ref="password"></Field>
                			</List.Item>
		        			
		        		</List>
		        	</div>
					<div style={{padding:"10px",marginTop:"50px"}}>
						<Button amStyle="primary" block radius={true} onClick={this.handleLogin}>登录</Button>
					</div>
					<Modal
						ref="modal"
						isOpen={false}
						role="alert"
						onAction={this.handleCloseModal}
					>
						请输入你正确的账号和密码！
					</Modal>
		        </Container>
      		</View>
		)
	}
});


//首页:Index component
export const Index=React.createClass({
	render(){
		return (
			<div>
				<Slider>
					<Slider.Item>
						<img src="../src/img/banner_01.jpg" />
					</Slider.Item>
					<Slider.Item>
						<img src="../src/img/banner_02.jpg" />
					</Slider.Item>
					<Slider.Item>
						<img src="../src/img/banner_04.jpg" />
					</Slider.Item>
				</Slider>
				<Group header="" noPadded={false} style={{marginTop:0}}>
					<Grid collapse={true}>
						<Col cols={3}>
							<div className="text-center">平台介绍</div>
							<div className="text-center" style={{color:"#999",fontSize:"12px"}}>上市公司战略投资</div>
						</Col>
						<Col cols={3}>
							<div className="text-center">邀请有礼</div>
							<div className="text-center" style={{color:"#999",fontSize:"12px"}}>一起赚大钱</div>
						</Col>
					</Grid>
				</Group>
				<Group>
					<h6 style={{borderBottom:"1px solid #ececec",paddingBottom:"5px"}}>月月赚</h6>
					<Grid collapse={true}>
						<Col cols={3} style={{borderRight:"1px solid #ececec"}}>
							<div className="text-center">9.5%</div>
							<div className="text-center" style={{color:"#999",fontSize:"12px"}}>年化收益</div>
						</Col>
						<Col cols={3}>
							<div className="text-center"><span style={{color:"#999",fontSize:"12px"}}>投资期限</span> 1个月</div>
							<div className="text-center"><span style={{color:"#999",fontSize:"12px"}}>可投金额</span> 0.35万</div>
						</Col>
					</Grid>
				</Group>

				<Group>
					<h6 style={{borderBottom:"1px solid #ececec",paddingBottom:"5px"}}>季季赚</h6>
					<Grid collapse={true}>
						<Col cols={3} style={{borderRight:"1px solid #ececec"}}>
							<div className="text-center">10.5%</div>
							<div className="text-center" style={{color:"#999",fontSize:"12px"}}>年化收益</div>
						</Col>
						<Col cols={3}>
							<div className="text-center"><span style={{color:"#999",fontSize:"12px"}}>投资期限</span> 3个月</div>
							<div className="text-center"><span style={{color:"#999",fontSize:"12px"}}>可投金额</span> 1.35万</div>
						</Col>
					</Grid>
				</Group>
			</div>


		)
	}
});

//理财列表页：ProductList component
export const ProductList=React.createClass({
	render(){
		return (
			<div>这是理财列表页面</div>
		)
	}
});

//用户中心页面：UserHome component
export const UserHome=React.createClass({
	render(){
		return (
			<div>这是用户中心页面</div>
		)
	}
});