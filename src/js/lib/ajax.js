
var ajax=function(options){
    var xhr=null;
    if(window.ActiveXObject){
        xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }else {
        xhr=new XMLHttpRequest();
    }

    xhr.onreadystatechange=function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            options.success(JSON.parse(xhr.responseText));
        }
    }
    xhr.open(options.method || "GET",options.url,!options.sync || true);
    xhr.setRequestHeader("content-type","application/json");
    xhr.send(options.data || null);
}

module.exports=ajax;