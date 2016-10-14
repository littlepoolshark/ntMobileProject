var MicroEvent = require('../lib/microevent.js');
var appDispatcher=require('../dispatcher/dispatcher.js');
var ajax=require("../lib/ajax.js");


var MyBankCardDetailStore={
    _all:{
        bankCardInfo:{
            id:"",
            bankId: "",
            bankName: "",
            branch: "",//支行名称
            cardno: "",
            fullCardNo:"",
            parentAreaId: "",//省份id
            parentAreaStr:"",//省份名字
            region: "",//市区id
            regionStr:"",//市区名字
            shortIcon:"",//银行logo图片在服务器的路径
        },
        provinceList:[],
        cityList:[]
    },
    getAll(){
        return this._all;
    },
    getProvinceId(){
        return this._all.bankCardInfo.parentAreaId;
    },
    processProvinceListOrCityList(list){
        let newList=[];
        for(let i=0;i<list.length;i++){
            newList[i]={
                value:list[i].id,
                text:list[i].name
            }
        }
        return newList;
    },
    checkForm(){
        let validationResult={
            success:true,
            msg:""
        };

        let {
            parentAreaStr,
            regionStr
            }=this._all.bankCardInfo;

        if(!parentAreaStr){
            validationResult={
                success:false,
                msg:"请选择开户省份"
            };
        }else if(!regionStr){
            validationResult={
                success:false,
                msg:"请选择开户城市"
            };
        }

        return validationResult;
    },
    updateAll(source){
        this._all=Object.assign(this._all,source);
    },
    getCityListCheck(){
        return !!this._all.bankCardInfo.parentAreaId ;
    }
};
MicroEvent.mixin(MyBankCardDetailStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getMyBankCardDetail":
            ajax({
                ciUrl:"/user/v2/myBankCardInfo",
                success(rs){
                    if(rs.code === 0 ){
                        MyBankCardDetailStore.updateAll({
                            bankCardInfo:rs.data
                        });
                        MyBankCardDetailStore.trigger("change_bankCardInfo");
                    }
                }
            });
            break;
        case "selectProvince_myBanKCardDetail":
            ajax({
                ciUrl:"/platinfo/v2/regionProsOrCitysList",
                data:{
                    subRegionId:"0"
                },
                success(rs){
                    if(rs.code === 0 ){
                        MyBankCardDetailStore.updateAll({
                            provinceList:MyBankCardDetailStore.processProvinceListOrCityList(rs.data.list)
                        });
                        MyBankCardDetailStore.trigger("change_provinceList");
                    }
                }
            });
            break;
        case "selectCity_myBanKCardDetail":
            if(MyBankCardDetailStore.getCityListCheck()){
                ajax({
                    ciUrl: "/platinfo/v2/regionProsOrCitysList",
                    data: {
                        subRegionId: MyBankCardDetailStore.getProvinceId()
                    },
                    success(rs){
                        if(rs.code === 0 ){
                            MyBankCardDetailStore.updateAll({
                                cityList:MyBankCardDetailStore.processProvinceListOrCityList(rs.data.list)
                            });
                            MyBankCardDetailStore.trigger("change_cityList");
                        }
                    }
                })
            }else {
                MyBankCardDetailStore.trigger("getCityListCheckFailed","请先选择省份！");
            }
            break;
        case "selectProvinceFinish":
            let originParentAreaId=MyBankCardDetailStore.getAll().bankCardInfo.parentAreaId;
            let newData={
                parentAreaId:payload.data.value,
                parentAreaStr:payload.data.text
            };
            if(newData.parentAreaId !== originParentAreaId ){
                newData.region="";
                newData.regionStr="";
            }
            MyBankCardDetailStore.updateAll({
                bankCardInfo:Object.assign(MyBankCardDetailStore.getAll().bankCardInfo,newData)
            });
            MyBankCardDetailStore.trigger("change_bankCardInfo");
            break;
        case "selectCityFinish":
            MyBankCardDetailStore.updateAll({
                bankCardInfo:Object.assign(MyBankCardDetailStore.getAll().bankCardInfo,{
                    region:payload.data.value,
                    regionStr:payload.data.text
                })
            });
            MyBankCardDetailStore.trigger("change_bankCardInfo");
            break;
        case "submitBankCardForm_myBanKCardDetail":
            /*MyBankCardDetailStore.updateAll({
                bankCardInfo:Object.assign(MyBankCardDetailStore.getAll().bankCardInfo,{
                    branch:payload.data.branch,
                })
            });*/
            let validationResult=MyBankCardDetailStore.checkForm();
            if(validationResult.success){
                let {
                    id,
                    bankId,
                    region,
                    branch,
                    fullCardNo
                    }=MyBankCardDetailStore.getAll().bankCardInfo;
                ajax({
                    ciUrl:"/user/v2/updateBankCard",
                    data:{
                        id:id,
                        bankId:bankId,
                        region:region,
                        branch:branch,
                        cardno:fullCardNo
                    },
                    success(rs){
                        if(rs.code === 0){
                            MyBankCardDetailStore.trigger("bankCardSubmitSuccess");
                        }else {
                            MyBankCardDetailStore.trigger("bankCardSubmitFailed",rs.description);
                        }
                    }
                });
            }else {
                MyBankCardDetailStore.trigger("bankCardSubmitFailed",validationResult.msg);
            }

            break;
        default:
        //no op
    }
});

module.exports=MyBankCardDetailStore;