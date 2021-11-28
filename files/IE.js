window.addEventListener('DOMContentLoaded', function (e) {
  const userAgent = window.navigator.userAgent.toLowerCase();
  if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
    window.location = '../error';
  }
});
