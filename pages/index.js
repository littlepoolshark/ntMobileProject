export About from './About';
//export Default from './Default';

// Components
// export Accordion from './AccordionExample';
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
import Container from "../src/js/Container";
import View from "../src/js/View";
import NavBar from "../src/js/NavBar";
import Button from "../src/js/Button";
import Field from "../src/js/Field";
import List from "../src/js/List";
import Icon from "../src/js/Icon";
import Modal from "../src/js/modal/Modal";
import Slider from "../src/js/Slider";



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
		          title="登录农泰金融"
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

			</div>


		)
	}
});