var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");
var cookie=require("../lib/cookie");

import config from "../config";

var PresentGoldenAppleStore={
    _all:{
        needInvest:0,//需要再投资多少可以获取下一级的奖励
        nextPrize:"",//下一级的奖励
        invested:0,//当前投资的金额
        curPrize:"",//当前的奖励
        grade:"1",//奖励所属的级别
        hasDefaultAddress:false,//是否有默认地址
        id:"",//礼品接收者地址信息记录的id
        userName:"",//礼品接收者的姓名
        phoneNo:"",//礼品接收者的手机号码
        address:"",//礼品接收者的收货地址
        isDefault:"yes"//是否是用户首选的地址
    },
    getAll(){
        return this._all;
    },
    updateAll(source){
        this._all=Object.assign({},this._all,source);
    },
    checkForm(){
        let validationResult={
            success:true,
            msg:""
        };
        let {
            userName,
            phoneNo,
            address
            }=this._all;

        if(userName === ""){
            validationResult={
                success:false,
                msg:"姓名不能为空，请输入！"
            }
        }else if(phoneNo === ""){
            validationResult={
                success:false,
                msg:"收货人电话号码不能为空，请输入！"
            }
        }else if(!(/1\d{10}$/i.test(phoneNo))){
            validationResult={
                success:false,
                msg:"收货人电话号码格式不对，请检查！"
            }
        }else if(address === ""){
            validationResult={
                success:false,
                msg:"收货地址不能为空，请输入！"
            }
        }else if(address.length < 5 ){
            validationResult={
                success:false,
                msg:"收货地址不能少于5个字符，请检查！"
            }
        }

        return validationResult;
    },
    clearAll(){
        this._all={
            needInvest:0,//需要再投资多少可以获取下一级的奖励
            nextPrize:"",//下一级的奖励
            invested:0,//当前投资的金额
            curPrize:"",//当前的奖励
            grade:1,//奖励所属的级别
            hasDefaultAddress:false,//是否有默认地址
            id:"",//礼品接收者地址信息记录的id
            userName:"",//礼品接收者的姓名
            phoneNo:"",//礼品接收者的手机号码
            address:"",//礼品接收者的收货地址
            isDefault:"yes"//是否是用户首选的地址
        };
    }
};
MicroEvent.mixin(PresentGoldenAppleStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getInitialData_pga":
            //获取用户的存在系统中的默认收货地址
            ajax({
                ciUrl:"/score/v2/userAllAddr",
                success(rs){
                    if(rs.code === 0){
                       if(rs.data.list.length){
                           let addressInfo=rs.data.list.filter(function(item,index){
                               return item.isDefault === "yes";
                           });
                           PresentGoldenAppleStore.updateAll({
                               id:addressInfo[0].id,
                               userName:addressInfo[0].name,
                               phoneNo:addressInfo[0].mobile,
                               address:addressInfo[0].address,
                               hasDefaultAddress:true
                           });
                           PresentGoldenAppleStore.trigger("change");
                       }else {//如果没用默认地址，则向后台请求当前用户的用户名和手机号码回填在地址表单中
                           ajax({
                               ciUrl:"/user/v2/securityCenter",
                               success(rs){
                                   if(rs.code === 0){
                                       PresentGoldenAppleStore.updateAll({
                                           userName:rs.data.idCardVerifyInfo.realNameFull,
                                           phoneNo:rs.data.mobileVerifyInfo.mobileFull
                                       });
                                       PresentGoldenAppleStore.trigger("change");
                                   }
                               }
                           });
                       }
                    }
                }
            });
            break;
        case "getPrizeGrade_pga":
            ajax({
                ciUrl:"/score/v2/getUserGrade",
                success(rs){
                    switch (rs.codeStr){
                        case "00000000":
                            let {
                                needInvest,
                                nextPrize,
                                invested,
                                curPrize,
                                grade
                                }=rs.data;

                            PresentGoldenAppleStore.updateAll({
                                needInvest,
                                nextPrize,
                                invested,
                                curPrize,
                                grade
                            });
                            PresentGoldenAppleStore.trigger("userCanGetPrize");
                            break;
                        case "10190001":
                        case "10190002":
                        case "10190003":
                            PresentGoldenAppleStore.trigger("somethingWithActivity",rs.description);
                            break;
                        case "10190004":
                            PresentGoldenAppleStore.trigger("userHadGotPrize",rs.data.prizeName);
                            break;
                        default:
                            break;
                    }
                }
            });
            break;
        case "getRedPackage_pga":
            PresentGoldenAppleStore.trigger("requestIsStarting");
            ajax({
                ciUrl:"/score/v2/get30yiPrize",
                success(rs){
                    PresentGoldenAppleStore.trigger("requestIsEnd");
                    if(rs.code === 0){
                        PresentGoldenAppleStore.trigger("getRedPackageSuccess");
                    }else {
                        PresentGoldenAppleStore.trigger("getRedPackageFailed",rs.description);
                    }
                }
            });
            break;
        case "changeFieldValue_pga":
            let source={};
            source[payload.data.fieldName]=payload.data.fieldValue;
            PresentGoldenAppleStore.updateAll(source);
            PresentGoldenAppleStore.trigger("change");
            break;
        case "submitAddressForm_pga":
            let validationResult=PresentGoldenAppleStore.checkForm();
            if(validationResult.success){
                let {
                    hasDefaultAddress,
                    id,
                    userName,
                    phoneNo,
                    address,
                    isDefault
                    }=PresentGoldenAppleStore.getAll();

                let postData={
                    name:userName,
                    mobile:phoneNo,
                    address,
                    isDefault
                };
                if(hasDefaultAddress){
                    postData.id=id;
                }
                PresentGoldenAppleStore.trigger("requestIsStarting");
                ajax({
                    ciUrl:hasDefaultAddress ? "/score/v2/updateUserAddr" : "/score/v2/addUserAddr",
                    data:postData,
                    success(rs){
                        if(rs.code === 0){
                            ajax({
                                ciUrl:"/score/v2/get30yiPrize",
                                success(rs){
                                    PresentGoldenAppleStore.trigger("requestIsEnd");
                                    if(rs.code === 0){
                                        PresentGoldenAppleStore.trigger("getGoldenAppleSuccess");
                                    }else {
                                        PresentGoldenAppleStore.trigger("getGoldenAppleFailed",rs.description);
                                    }
                                }
                            });
                        }else {
                            PresentGoldenAppleStore.trigger("requestIsEnd");
                            PresentGoldenAppleStore.trigger("submitAddressFormFailed",rs.description);
                        }
                    }
                });
            }else {
                PresentGoldenAppleStore.trigger("addressFormCheckFailed",validationResult.msg);
            }
        default:
        //no op
    }
});

module.exports=PresentGoldenAppleStore;