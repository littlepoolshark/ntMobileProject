let config={
    _apiBasicPath:"/mock/",
    _apiUrlSuffix:".json",
    createFullPath(path){
        return this._apiBasicPath + path + this._apiUrlSuffix;
    },
    productNameMap:{
        new_product:"新手标",
        ttz_product:"天天赚",
        yyz_product:"月月赚",
        jjz_product:"季季赚"
    }
}

export  default config;