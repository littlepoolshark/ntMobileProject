
export  default function getParamObjFromUrl(){
    let paramObj={};
    let locationStr=location.hash;
    let index=locationStr.indexOf("?");
    if(index > -1){
        let paramArr=locationStr.slice(index+1).split("&");
        for(let i=0;i<paramArr.length;i++){
            let paramObj_key=paramArr[i].split("=")[0];
            let paramObj_value=paramArr[i].split("=")[1];
            paramObj[paramObj_key]=paramObj_value;
        }
    }
    return paramObj;
};