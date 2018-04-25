import cookie from "./cookie";

let ua = window.navigator.userAgent;
let deviceType=cookie.getCookie("deviceType");
let isInWeChatBrowser=ua.indexOf("MicroMessenger") > -1 ;
let isAndroid=/android/i.test(ua) || ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
let isIOS=!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
let isNewAndroidApp= !!deviceType && deviceType.toLowerCase() === "ntandroid";
let isNewIOSApp= !!deviceType && deviceType.toLowerCase() === "ntios";
let isOldAndroidApp=isAndroid && !isNewAndroidApp && !isInWeChatBrowser;
let isOldIOSApp=isIOS && !isNewIOSApp && !isInWeChatBrowser;

export {
    isInWeChatBrowser,
    isAndroid,
    isIOS,
    isNewAndroidApp,
    isNewIOSApp,
    isOldAndroidApp,
    isOldIOSApp
};

