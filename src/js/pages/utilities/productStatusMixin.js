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