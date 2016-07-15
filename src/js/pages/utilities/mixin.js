
let mixin={
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
    _getProductStatusText(productType,productStatus){
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
            case "creditor_product":
                if(productStatus === "transfered"){
                    statusText="售罄";
                }else {
                    statusText="立即抢购";
                }
                break;
            default:
                break;
        }
        return statusText;
    },
    /*
    * @desc 将金额格式化为以万为单位，同时保留两位小数点，主要用于大数目的金额，例如，项目总额，可投金额等等
    *
    * @param amount {number} //未格式化的金额
    * @return  {string} //格式化后的金额
    *
    * @author sam liu
    * @date 2016-07-05
    */
    _amountFormater(amount){
        return (amount / 10000).toFixed(2);
    },
    /*
     * @desc 将小数类型的年化利率格式化为以百分号为单位的字符串
     *
     * @param yearRate {number} //未格式化的年化利率
     * @param outputUnit {boolean} //是否返回单位"%"。true：返回，false：不返回。默认不返回
     * @return  {string} //格式化后的年化利率
     *
     * @author sam liu
     * @date 2016-07-05
     */
    _yearRateFormater(yearRate,outputUnit){
        outputUnit=outputUnit || false;
        return outputUnit ? (yearRate * 100).toFixed(1)+"%" : (yearRate * 100).toFixed(1);
    }

}

export  default mixin;