const map = {
    data: [
      {
        text: "统一社会信用代码",
        code: "73"
      },
      {
        text: "组织机构代码",
        code: "52"
      }
    ],
    getIDTypeList() {
      let IDTypeList = [];
      this.data.forEach(IDType => {
        IDTypeList.push(IDType.text);
      });
  
      return IDTypeList;
    }
  };
  
  export default map;
  