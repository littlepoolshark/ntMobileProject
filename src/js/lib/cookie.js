/*
 * @desc 封装cookie，目前支持设置cookie和获取cookie。
 *
 * @author sam liu
 * @date 2016-07-07
*/
function setCookie(name,value,expireMinutes)
{
    let expiredate=new Date();
    if(expireMinutes){
        expiredate.setMinutes(expiredate.getMinutes()+expireMinutes);
    }
    document.cookie=name+ "=" +escape(value)+ ( !expireMinutes ? "" : ";expires="+expiredate.toGMTString());
}

function getCookie(name)
{
    if (document.cookie.length>0)
    {
        let startIndex=document.cookie.indexOf(name + "=");
        if (startIndex !== -1) {
            startIndex=startIndex + name.length+1;
            let endIndex=document.cookie.indexOf(";",startIndex);
            if (endIndex === -1) {
                endIndex=document.cookie.length;
            }
            return unescape(document.cookie.substring(startIndex,endIndex));//TODO:去除返回的字符串的首尾空格
        }
    }
    return "";
}

let cookie={
    setCookie:setCookie,
    getCookie:getCookie
}

module.exports=cookie;