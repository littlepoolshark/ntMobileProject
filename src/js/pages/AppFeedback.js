//@flow
import "../../scss/page/AppFeedback.scss";
import AppFeedbackAction from "../actions/AppFeedbackAction";
import AppFeedbackStore from "../stores/AppFeedbackStore";
import React, { Component, PropTypes } from 'react';

import Container from "../UIComponents/Container";
import Button from "../UIComponents/Button";
import Group from "../UIComponents/Group";
import Field from "../UIComponents/Field";
import Modal from "../UIComponents/modal/Modal";

const MAX_FEEDBACKTEXT_LENGTH: number = 140;



class AppFeedback extends Component {

    state: {
        data: Object,
        isModalOpen: boolean,
        modalText: string,
        isSubmitSuccess:boolean
    }

    constructor(props: Object) {
        super(props);

        this.state = {
            data: AppFeedbackStore.getAll(),
            isModalOpen: false,
            modalText: "",
            isSubmitSuccess:false
        }
    }

    _handleFeedbackTextChange() {
        let feedbackText: string = this.refs.feedbackText.getValue();
        if(feedbackText.length > MAX_FEEDBACKTEXT_LENGTH) {
            feedbackText=feedbackText.slice(0,140);
        }
        AppFeedbackAction.changeFeedbackText(feedbackText);
    }

    _submitFeedbackText() {
        AppFeedbackAction.submitFeedbackText();
    }

    _handleModalClose() {
        this.setState({
            isModalOpen: false
        })
    }

    _handleOpenModal(modalText: string, next?: () => mixed) {
        this.setState({
            isModalOpen: true,
            modalText
        }, () => {
            next && next();
        })
    }

    _jumpToNextLocation() {
        this.context.router.push({
            pathname: "userHome"
        })
    }

    render() {
        let remainTextLength: number = MAX_FEEDBACKTEXT_LENGTH - this.state.data.feedbackText.length;

        return (
            <Container id="appFeedback">
                <Group>
                    <Field
                        label=""
                        placeholder="请写下你宝贵的意见！"
                        type="textarea"
                        rows={6}
                        ref="feedbackText"
                        value={this.state.data.feedbackText}
                        onChange={(e) => {
                            this._handleFeedbackTextChange()
                        }}
                    />
                    <div className="input-count-hint text-right">您还可以输入{remainTextLength}个字</div>
                </Group>
                <div className="btn-wrapper">
                    <Button amStyle="primary" block radius onClick={() => { this._submitFeedbackText() }}>告知我们</Button>
                </div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    role="alert"
                    onDismiss={() => { this._handleModalClose() }}
                    onClosed={this.state.isSubmitSuccess ? () => { this._jumpToNextLocation()} : () => {}}
                >
                    {this.state.modalText}
                </Modal>
            </Container>
        );
    }

    componentDidMount() {
        AppFeedbackStore.bind("change", () => {
            this.setState({
                data: AppFeedbackStore.getAll()
            });
        });

        AppFeedbackStore.bind("formCheckFailed", (msg) => {
            this._handleOpenModal(msg);
        });

        AppFeedbackStore.bind("feedbackTextSubmitFailed", (msg) => {
            this._handleOpenModal(msg);
        });

        AppFeedbackStore.bind("feedbackTextSubmitSuccess", (msg) => {
            this.setState({
                isModalOpen: true,
                modalText: msg,
                isSubmitSuccess: true
            });
        });
    }

    componentWillUnmount() {
        AppFeedbackStore.clearAll();
    }
}

AppFeedback.contextTypes = {
    router: React.PropTypes.object.isRequired
};


module.exports = AppFeedback;