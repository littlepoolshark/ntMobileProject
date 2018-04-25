const map = {
  data: [
    {
      text: "个人",
      code: "1"
    },
    {
      text: "企业",
      code: "2"
    }
  ],
  getLoanerTypeList() {
    let loanerTypeList = [];
    this.data.forEach(loanerType => {
      loanerTypeList.push(loanerType.text);
    });

    return loanerTypeList;
  }
};

export default map;
