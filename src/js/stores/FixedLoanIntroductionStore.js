let MicroEvent = require('../lib/microevent.js');
let appDispatcher=require('../dispatcher/dispatcher.js');
let ajax=require("../lib/ajax.js");


let  FixedLoanIntroductionStore={
    _all:{
        id:"",
        type:"loan_product",
        productApr:0,
        buyProgress:0,
        remainAmount:0,
        repaymentLimit:0,
        repaymentTypeUnit:"个月",
        totalAmount:0,
        productName:"",
        bidDays:0,
        publishTime:new Date(),
        status:""
    },
    setAll(source){
        Object.assign(this._all,source);
    },
    getAll(){
        return this._all;
    },
    extractLicenseListAndUpdate(list){
      let arr=[];
      for(let i=0;i<list.length;i++){
          if(arr.indexOf(list[i].typeName) === -1){
              arr.push(list[i].typeName);
          }
      }
      this._all.licenseList=arr;
    },
    extractGuaranteeLicenseListAndUpdate(data){
        let guaranteeLicenseList=[];
        let guaranteeLabelList=[];
        if(data.hasOwnProperty("idCard") && data.idCard !== ""){
            guaranteeLicenseList.push("担保人身份证");
        }
        if(data.hasOwnProperty("licenceCode") && data.licenceCode !== ""){
            guaranteeLicenseList.push("担保人营业执照");
        }
        guaranteeLabelList=data.introductionList;
        Object.assign(this._all,{
            guaranteeLicenseList:guaranteeLicenseList,
            guaranteeLabelList:guaranteeLabelList
        });
    },
    processData(data){
        data.buyProgress=data.buyProgress + "%";
        data.productApr=(data.productApr * 100).toFixed(1);
        data.remainAmount=data.remainAmount.toFixed(2);
        return data;
    }
};
MicroEvent.mixin(FixedLoanIntroductionStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "fixedLoanIntroduction_getDataFromServer":
            ajax({
                ciUrl:"/invest/v2/loanInvestDetail",
                data:{
                    loanId:payload.data.productId
                },
                success:function(rs){
                    if(rs.code === 0){
                        let data=rs.data;
                        let source={
                            id:data.id,
                            type:"loan_product",
                            productApr:data.yearRate,
                            buyProgress:data.proess,
                            remainAmount:data.remainAmount,
                            repaymentLimit:data.repaymentMonths,
                            repaymentTypeUnit:data.loanTypeUnit,
                            totalAmount:data.amount,
                            productName:data.title,
                            status:data.status,
                            bidDays:data.bidDays,
                            publishTime:data.publishTime,
                            rewardRate:data.rewardRate,
                            useDesc:data.useDesc,
                            isSupportAdvanceRepayment:data.isSupportAdvanceRepayment === "yes" ? true : false
                        };
                        FixedLoanIntroductionStore.setAll(FixedLoanIntroductionStore.processData(source));
                        FixedLoanIntroductionStore.trigger("change");

                        //获取总的资质信息
                        ajax({
                            ciUrl:"/invest/v2/loanExtAttatchmentInfo",
                            data:{
                                loanId:payload.data.productId,
                                status:data.status
                            },
                            success:function(rs){
                                if(rs.code === 0){
                                    FixedLoanIntroductionStore.extractLicenseListAndUpdate(rs.data.list);
                                    FixedLoanIntroductionStore.trigger("change");
                                }
                            }
                        });

                        //获取担保人资质信息
                        ajax({
                            ciUrl:"/invest/v2/loanExtWarrantInfo",
                            data:{
                                loanId:payload.data.productId,
                                orgId:data.warrantOrg
                            },
                            success:function(rs){
                                if(rs.code === 0){
                                    FixedLoanIntroductionStore.extractGuaranteeLicenseListAndUpdate(rs.data);
                                    FixedLoanIntroductionStore.trigger("change");
                                }
                            }
                        });
                    }else {
                        FixedLoanIntroductionStore.trigger("getDataFailed");
                    }
                }
            });
            //获取标的借款人信息
            ajax({
                ciUrl:"/invest/v2/loanExtPersonalInfo",
                data:{
                    bidId:payload.data.productId
                },
                success:function(rs){
                    if(rs.code === 0){
                        if(rs.data.hasOwnProperty("enterprise")){
                            FixedLoanIntroductionStore.setAll({
                                licenseType:"enterprise",
                                companyName:rs.data.enterprise.companyName,
                                corporation:rs.data.enterprise.corporation,
                                loanDescr:rs.data.loanDescr,
                                repaymentSource:rs.data.remark
                        });
                        }else {
                            FixedLoanIntroductionStore.setAll({
                                licenseType:"person",
                                realName:rs.data.realName,
                                marriedDescr:rs.data.marriedDescr,
                                genderDescr:rs.data.genderDescr,
                                age:rs.data.age,
                                loanDescr:rs.data.loanDescr,
                                repaymentSource:rs.data.remark
                            });
                        }

                        FixedLoanIntroductionStore.trigger("change");
                    }
                }
            });
            break;
        default:
        //no op
    }
});

module.exports=FixedLoanIntroductionStore;