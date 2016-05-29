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

// import React from "react";
// export const About=React.createClass({
// 	render (){
// 		return (
// 			<div>about页面</div>
// 		)
// 	}
// });
import React from "react";
import Container from "../src/js/Container";
import View from "../src/js/View";
import NavBar from "../src/js/NavBar";
import Button from "../src/js/Button";
import Field from "../src/js/Field";
import List from "../src/js/List";



export const Default=React.createClass({
	render (){
		return (
			<View id="app-index">
		        <NavBar
		          amStyle="primary"
		          title="首页"
		        />
		        <Container scrollable>
		        	<div style={{padding:"10px",marginTop:"80px"}}>
		        		<List>
		        			<List.Item
			                  nested="input"
			                >
			                  <Field type="text" label="账户" placeholder="请输入您的手机号码,haha"></Field>
                			</List.Item>

		        			<List.Item
			                  nested="input"
			                >
			                	<Field type="text" label="密码" placeholder="请输入您的登录密码"></Field>
                			</List.Item>
		        			
		        		</List>
		        		<Button amStyle="primary" block radius={true}>登录</Button>
		        	</div>
		        </Container>
      		</View>
		)
	}
});