let cookie=require("./cookie");
/* @desc 自己封装的ajax，目前主要支持工作中常用的post，get请求。调用方式几乎等同于jquery的ajax封装，略有出入。
*
*  @param obj.url {string} //请求的url
*  @param obj.ciUrl {string} // 用于中转的url
*  @param obj.method {string}//请求的方法
*  @param obj.data {obj} //需要发送的数据（json对象）
*  @param obj.async {boolean}//true:异步请求，false:同步请求
*  @return  void；
*
*  @author sam liu
*  @date 2016-07-06
* */
function ajax(obj) {
    const CONSIDER_IE=false;//因为这是移动端的项目，所以不考虑ie浏览器
    let initData={
        ciUrl:"/ci"+obj.ciUrl,
        content:{
            "imei":"23ffgffffffffffffffff",
            "opSource":"wx",
            "terminal":"wx",
            "version":"2.0"
        },
    };

    //有些接口需要用户登录后才能发送请求，所以一旦登录后，就将token附上
    if(cookie.getCookie("token")){
        initData.token=cookie.getCookie("token");
    }


    //基于兼容考虑，创建一个XMLHttpRequest对象
    function createXHR() {
        if (window.XMLHttpRequest) {	//IE7+、Firefox、Opera、Chrome 和Safari
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {   //IE6 及以下
            var versions = ['MSXML2.XMLHttp','Microsoft.XMLHTTP'];
            for (var i = 0,len = versions.length; i<len; i++) {
                try {
                    return new ActiveXObject(version[i]);
                    break;
                } catch (e) {
                    //跳过
                }
            }
        } else {
            throw new Error('浏览器不支持XHR对象！');
        }
    }

    //名值对转换为字符串
    function params(data) {
        var arr = [];
        for (var i in data) {
            //特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        return arr.join('&');
    }

    function callback() {
        if (xhr.status == 200) {  //判断http的交互是否成功，200表示成功
            obj.success(JSON.parse(xhr.responseText));//将返回的json字符串解析返回
        } else {
            //alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
        }
    }

    var xhr = createXHR();	//创建XHR对象

    //通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题
    //开发环境下，向本地服务器http://192.168.1.90:9090/ci.jsp发送请求，考虑到移动端的联调，所以使用了ip地址
    obj.url = obj.url ? (CONSIDER_IE ? obj.url + '?rand=' + Math.random() : obj.url) : "http://192.168.1.140:9090/ci.jsp";
    obj.method = obj.method || "post";//因为实际开发环境中的接口大部分都是post请求，所以默认是post方法。

    //开发环境中，默认要发送BASIC_DATA数据到服务器，如果调用时传入了数据参数，则先合并，然后通过params()将名值对转换成字符串
    if(obj.data){
        initData.content=JSON.stringify(Object.assign(initData.content,obj.data));
    }else {
        initData.content=JSON.stringify(initData.content);
    }
    //console.log("data send to sever:",initData);
    obj.data = params(initData);
    obj.async = obj.async || true; //默认使用异步请求

    //若是GET请求，则将数据加到url后面
    if (obj.method === 'get') {
        obj.url += '&' + obj.data;
    }
    //true表示异步，false表示同步
    //使用异步调用的时候，需要触发readystatechange 事件
    if (obj.async === true) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {   //判断对象的状态是否交互完成
                callback();		 //回调
            }
        };
    }

    //在使用XHR对象时，必须先调用open()方法，
    //它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
    xhr.open(obj.method, obj.url, obj.async);
    if (obj.method === 'post') {
        //post方式需要自己设置http的请求头，来模仿表单提交。
        //放在open方法之后，send方法之前。
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send(obj.data);		//post方式将数据放在send()方法里
    } else {
        xhr.send(null);		//get方式则填null
    }
    if (obj.async === false) {  //同步
        callback();
    }

}

module.exports=ajax;