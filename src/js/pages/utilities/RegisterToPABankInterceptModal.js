import "../../../scss/page/RegisterToPABankHintModal.scss";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { hashHistory } from "react-router";
import { Icon, Button, Modal } from "../../UIComponents/index";
import microEvent from "../../lib/microevent";
import ajax from "../../lib/ajax";

let pubsub = {};
let modalContainer = null;
microEvent.mixin(pubsub);

const RegisterToPABankHintModal = props => {
  let { closeModal, jumpToNextLocation } = props;

  return (
    <div id="registerToPABankHint-modal">
      <Icon name="modal-closeBtn" classPrefix="imgIcon" onClick={closeModal} />
      <img
        src={require("../../../img/pop_top.png")}
        className="banner"
        alt=""
      />
      <div className="content">
        为了保障您的资金安全<br />
        请完成资金存管子账户开通及银行卡绑定
      </div>
      <div className="registerToPABankHint-modal-btn-wrapper">
        <Button amStyle="primary" block radius onClick={jumpToNextLocation}>
          马上开通/绑卡
        </Button>
      </div>
    </div>
  );
};

class RegisterToPABankInterceptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cgOpenCode: -1,
      isModalOpen: false,
      leftQureyTime: 3
    };
  }

  _closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  _openModal = () => {
    this.setState({
      isModalOpen: true
    });
  };

  _jumpToNextLocation = () => {
    let { leftQureyTime, cgOpenCode } = this.state;

    this.setState(
      {
        isModalOpen: false
      },
      () => {
        let nextLocation = "registerToPABank";
        if (leftQureyTime === 0) {
          nextLocation = "registerToPABankFailedHint";
        }
        hashHistory.push({
          pathname: nextLocation,
          query: {
            cgOpenCode
          }
        });
      }
    );
  };

  _getModalRoleAndInnerText = () => {
    let modalRole = "";
    let modalInnerText = "";

    switch (this.state.cgOpenCode) {
      case -1:
        modalRole = "loading";
        modalInnerText = "加载中，请稍候......";
        break;
      case 1:
        modalRole = "alert";
        modalInnerText = "恭喜，您已经成功开通存管子账户！";
        break;
      case 0:
      case 2:
      case 4:
        modalRole = "loading";
        modalInnerText = (
          <RegisterToPABankHintModal
            closeModal={this._closeModal}
            jumpToNextLocation={this._jumpToNextLocation}
          />
        );
        break;
      case 3:
        modalRole = "alert";
        modalInnerText = "存管子账户已提交平安银行审核，请次日再查询！";
        break;
      default:
        break;
    }

    return {
      modalRole,
      modalInnerText
    };
  };

  render() {
    let { modalRole, modalInnerText } = this._getModalRoleAndInnerText();

    return (
      <Modal
        title={modalRole !== "loading" ? "提示" : ""}
        isOpen={this.state.isModalOpen}
        role={modalRole}
        onDismiss={this._closeModal}
      >
        {modalInnerText}
      </Modal>
    );
  }

  componentDidMount() {
    pubsub.bind("registerToPABankInterceptModal.show", () => {
      this.setState(
        {
          isModalOpen: true,
          cgOpenCode: -1
        },
        () => {
          ajax({
            ciUrl: "/user/v2/securityCenter",
            success: rs => {
              if (rs.code === 0) {
                let result = rs.data.zxcgOpenInfo;
                this.setState({
                  cgOpenCode: parseInt(result.cgOpen),
                  leftQureyTime: result.leftQureyTime
                });
              }
            },
            loginTimeout: () => {
              this._closeModal();
            },
            error: () => {
              this._closeModal();
            }
          });
        }
      );
    });
  }
}

RegisterToPABankInterceptModal.show = function() {
  if (!!!modalContainer) {
    createModalContainer();
  }
  pubsub.trigger("registerToPABankInterceptModal.show");
};

function createModalContainer() {
  modalContainer = document.createElement("div");
  document.body.appendChild(modalContainer);
  ReactDOM.render(<RegisterToPABankInterceptModal />, modalContainer);
}

export default RegisterToPABankInterceptModal;
