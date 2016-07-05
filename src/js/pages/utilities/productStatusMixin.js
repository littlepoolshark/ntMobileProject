/*
*  @descr 根据产品的类型和产品的状态来得到产品状态的描述
*
*  @param {string} productType //产品的类型（“新手标”，“天天赚”，“月月赚”，“季季赚”，“好采投”和“债权转让”）
*  @param {string} productStatus //产品的状态
*  @return {string} //根据产品的类型和产品的状态来得出产品状态的描述文本(立即抢购，售罄，预约，预发布...)
*
*  @author sam liu
*  @date 2016-07-05
*/
let productStatus={
    getProductStatusText(productType,productStatus){
        let statusText="";
        switch (productType) {
            case "new_product":
            case "yyz_product":
            case "jjz_product":
                if(productStatus === "already_publish"){
                    statusText="立即抢购";
                }else {
                    statusText="售罄";
                }
                break;
            case "ttz_product":
                if(productStatus === "already_publish"){
                    statusText="立即抢购";
                }else {
                    statusText="预约";
                }
                break;
            case "loan_product":
                if(productStatus === "bidding"){
                    statusText="立即抢购";
                }else if(productStatus === "prepublish"){
                    statusText="预发布";
                }else {
                    statusText="售罄";
                }
                break;
            default:
                break;
        }
        return statusText;
    }
}

export  default productStatus;