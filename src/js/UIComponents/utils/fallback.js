// Android browsers legacy flexbox fallback
try {
  const ua = navigator.userAgent;

  // TODO:
  // - add version detecting when UC supports flexbox
  if (/android/i.test(ua) && /ucbrowser/i.test(ua)) {
    document.documentElement.className += ' ua-stupid-uc';
  }
} catch(e) {}
