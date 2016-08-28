function type(obj){
    let typeMap={
        "[object Boolean]":"boolean",
        "[object Number]":"number",
        "[object String]":"string",
        "[object Function]":"function",
        "[object Array]":"array",
        "[object Date]":"date",
        "[object RegExp]":"regExp",
        "[object Undefined]":"undefined",
        "[object Null]":"null",
        "[object Object]":"object"
    };

    return typeMap[Object.prototype.toString.call(obj)];
}

module.exports=type;