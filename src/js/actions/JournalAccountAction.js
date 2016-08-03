var appDispatcher=require("../dispatcher/dispatcher.js");

var JournalAccountAction={
    getNextPage(){
        appDispatcher.dispatch({
            actionName:"journalAccount_getNextPage"
        })
    }
};

module.exports=JournalAccountAction;