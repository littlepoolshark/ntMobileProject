function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label);
}

function add(x:number,y:number) : number {
    return x+y;
}

let myObj = { size: 10,label:"hello world"};
printLabel(myObj);

add(1,2);