
/*
* @desc 删除左右两端的空格
*/
export function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/*
 * @desc 删除左边的空格
 */
export function ltrim(str){
    return str.replace(/(^\s*)/g,"");
}

/*
 * @desc 删除右边的空格
 */
export function rtrim(str){
    return str.replace(/(\s*$)/g,"");
}

