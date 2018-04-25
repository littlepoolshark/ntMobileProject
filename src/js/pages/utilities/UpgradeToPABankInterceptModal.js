import "../../../scss/page/UpgradeToPABankInterceptModal.scss";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { hashHistory } from "react-router";
import { Icon, Button, Modal } from "../../UIComponents/index";
import microEvent from "../../lib/microevent";
import ajax from "../../lib/ajax";

let pubsub = {};
let modalContainer = null;
microEvent.mixin(pubsub);

//在用户没有彻底走完整个存管升级流程时（存管开通状态=1、2、3），出现的拦截窗口
const IncompletePACGModal = props => {
  let { closeModal, jumpToNextLocation } = props;

  function noMoreRemindersHandler() {
    sessionStorage.setItem("noMoreReminderFlag", "true");
    closeModal();
  }

  return (
    <div className="modal-dialog" style={{ margin: "-0.9375rem -0.625rem" }}>
      <div className="modal-body">
        您尚未完成平安银行存管账户设置，<br />
        请前往“安全中心”完成设置。<br />
      </div>
      <div className="modal-footer" style={{ marginBottom: "-0.9375rem" }}>
        <span className="modal-btn" onClick={noMoreRemindersHandler}>
          不再提醒
        </span>
        <span className="modal-btn" onClick={jumpToNextLocation}>
          去设置
        </span>
      </div>
    </div>
  );
};

//对还没开通平安存管子账户提示的弹窗。
// const UnregisteredHintModal = props => {
//   let { closeModal } = props;

//   return (
//     <div className="modal-dialog" style={{ margin: "-0.9375rem -0.625rem" }}>
//       <div className="modal-body">
//         银行存管系统升级中，<br />
//         暂时无法进行此操作，请耐心等待。<br />
//         如有疑问请联系客服
//       </div>
//       <div className="modal-footer" style={{ marginBottom: "-0.9375rem" }}>
//         <span className="modal-btn" onClick={closeModal}>
//           取消
//         </span>
//         <span className="modal-btn">
//           <a href="tel:4006322688">联系客服</a>
//         </span>
//       </div>
//     </div>
//   );
// };
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


const UpgradeToPABankHintModal = props => {
  let { closeModal, cgOpenCode } = props;

  function jumpToNextLocation(action) {
    return function() {
      hashHistory.push({
        pathname: "upgradeToPABank",
        query: {
          action
        }
      });
    };
  }

  let actionMap = {
    1: {
      actionName: "设置交易密码",
      btnName: "去设置",
      jumpToNextLocation: jumpToNextLocation("passwordSetting")
    },
    2: {
      actionName: "绑定银行卡",
      btnName: "去绑卡",
      jumpToNextLocation: jumpToNextLocation("bindBankCard")
    },
    3: {
      actionName: "完成账户授权",
      btnName: "去授权",
      jumpToNextLocation: () => {
        pubsub.trigger("UpgradeToPABankInterceptModal.authorize", "authorize");
      }
    }
  };

  let currAction = actionMap[cgOpenCode];

  return (
    <div id="upgradeToPABankHint-modal">
      <Icon name="modal-closeBtn" classPrefix="imgIcon" onClick={closeModal} />
      <img
        src={require("../../../img/pop_banner@2x.jpg")}
        className="banner"
        alt=""
      />
      <div className="content">
        为了保障您的资金安全，请先{currAction.actionName}
      </div>
      <div className="upgradeToPABankHint-modal-btn-wrapper">
        <Button
          amStyle="primary"
          block
          radius
          onClick={closeModal.bind(null, currAction.jumpToNextLocation)}
        >
          {currAction.btnName}
        </Button>
      </div>
    </div>
  );
};

class UpgradeToPABankInterceptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cgOpenCode: -1,
      isModalOpen: false
    };
  }

  _closeModal = callback => {
    this.setState(
      {
        isModalOpen: false
      },
      () => {
        typeof callback === "function" && callback();
      }
    );
  };

  _openModal = () => {
    this.setState({
      isModalOpen: true
    });
  };

  _getModalRoleAndInnerText = () => {
    let modalRole = "";
    let modalInnerText = "";

    switch (this.state.cgOpenCode) {
      case -1:
        modalRole = "loading";
        modalInnerText = "加载中，请稍候......";
        break;
      case 0:
        modalRole = "loading";
        modalInnerText = (
          <RegisterToPABankHintModal 
            closeModal={this._closeModal} 
            jumpToNextLocation={this._jumpToPABankRegister} 
          />
        );
        break;
      case 1:
      case 2:
      case 3:
        modalRole = "loading";
        modalInnerText = (
          <UpgradeToPABankHintModal
            closeModal={this._closeModal}
            cgOpenCode={this.state.cgOpenCode}
          />
        );
        break;
      case 5:
        modalRole = "loading";
        modalInnerText = (
          <IncompletePACGModal
            closeModal={this._closeModal}
            jumpToNextLocation={this._jumpToSecurityCenter}
          />
        );
        break;
      default:
        break;
    }

    return {
      modalRole,
      modalInnerText
    };
  };
  //直接跳转到平安银行域名下的页面来填写表单
  _jumpToNextLocation(data) {
    let { action, orig, sign, returnurl, NOTIFYURL, wxurl } = data;
    let nextLocation = `${wxurl}?action=${encodeURI(action)}&orig=${encodeURI(
      orig
    )}&sign=${encodeURI(sign)}&returnurl=${encodeURI(
      returnurl
    )}&NOTIFYURL=${encodeURI(NOTIFYURL)}`;
    window.location.href = nextLocation;
  }

  _jumpToSecurityCenter = () => {
    this._closeModal(() => {
      hashHistory.push({
        pathname: "securityCenter"
      });
    });
  };

  _jumpToPABankRegister=() => {
    this._closeModal(() => {
      hashHistory.push({
        pathname: "upgradeToPABank",
        query:{
          action:'register'
        }
      });
    });
  }

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
    //共用的listener
    let upgradeToPABankListener = actionName => {
      let tranCode = "";
      switch (actionName) {
        case "modifyDealPW":
          tranCode = "NETL20";
          break;
        case "resetDealPW":
          tranCode = "NETL21";
          break;
        case "authorize":
          tranCode = "NETL17";
          break;
        default:
          throw new Error("unknown antionName!");
      }
      this.setState(
        {
          isModalOpen: true,
          cgOpenCode: -1
        },
        () => {
          ajax({
            ciUrl: "/user/v2/manager",
            data: {
              tranCode,
              channelType: "wx"
            },
            success: rs => {
              if (rs.code === 0) {
                this._jumpToNextLocation(rs.data);
              }
            },
            loginTimeout: () => {
              this._closeModal();
            },
            timeout: () => {
              this._closeModal();
            },
            error: () => {
              this._closeModal();
            }
          });
        }
      );
    };

    //最基本的拦截功能
    pubsub.bind("UpgradeToPABankInterceptModal.show", callback => {
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
                if (result.cgstatus === "4") {
                  this._closeModal();
                  typeof callback === "function" && callback();
                } else {
                  this.setState({
                    cgOpenCode: parseInt(result.cgstatus)
                  });
                }
              }
            },
            loginTimeout: () => {
              this._closeModal();
            },
            timeout: () => {
              this._closeModal();
            },
            error: () => {
              this._closeModal();
            }
          });
        }
      );
    });

    //存管升级流程没有彻底走完的拦截
    pubsub.bind("UpgradeToPABankInterceptModal.checkPACGCompleteness", () => {
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
                if (["1", "2", "3"].indexOf(result.cgstatus) > -1) {
                  this.setState({
                    cgOpenCode: 5
                  });
                } else {
                  this._closeModal();
                }
              }
            },
            loginTimeout: () => {
              this._closeModal();
            },
            timeout: () => {
              this._closeModal();
            },
            error: () => {
              this._closeModal();
            }
          });
        }
      );
    });

    //授权
    pubsub.bind(
      "UpgradeToPABankInterceptModal.authorize",
      upgradeToPABankListener
    );

    //修改交易密码
    pubsub.bind(
      "UpgradeToPABankInterceptModal.modifyDealPW",
      upgradeToPABankListener
    );

    //重置交易密码
    pubsub.bind(
      "UpgradeToPABankInterceptModal.resetDealPW",
      upgradeToPABankListener
    );
  }

  componentWillUnmount() {
    pubsub.unbind("UpgradeToPABankInterceptModal.show");
    pubsub.unbind("UpgradeToPABankInterceptModal.authorize");
  }
}

function createModalContainer() {
  modalContainer = document.createElement("div");
  document.body.appendChild(modalContainer);
  ReactDOM.render(<UpgradeToPABankInterceptModal />, modalContainer);
}

function triggerFactory(methodName) {
  return function() {
    if (!!!modalContainer) {
      createModalContainer();
    }
    pubsub.trigger("UpgradeToPABankInterceptModal." + methodName, methodName);
  };
}

UpgradeToPABankInterceptModal.show = function(callback) {
  if (!!!modalContainer) {
    createModalContainer();
  }
  pubsub.trigger("UpgradeToPABankInterceptModal.show", callback);
};

UpgradeToPABankInterceptModal.authorize = triggerFactory("authorize");
UpgradeToPABankInterceptModal.modifyDealPW = triggerFactory("modifyDealPW");
UpgradeToPABankInterceptModal.resetDealPW = triggerFactory("resetDealPW");
UpgradeToPABankInterceptModal.checkPACGCompleteness = triggerFactory(
  "checkPACGCompleteness"
);

UpgradeToPABankInterceptModal.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default UpgradeToPABankInterceptModal;
