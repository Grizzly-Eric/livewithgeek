'use strict';

const AjaxGet = function( method, url, callback ){

    var settings = {
      async: true,
      crossDomain: true,
      url: "https://leancloud.cn:443/1.1" + url,
      method: method,
      headers: {
        "x-lc-id": "pdTXKFbLP4uoCMc57yjzQEqX-gzGzoHsz",
        "x-lc-key": "rUxa69bB5JswFbLs06qpaySi",
        "content-type": "application/json",
      }
    }

    $.ajax(settings)
    .always(function (response) {
        console.log("ajaxget-callback-ok");
        callback(response)
    })

}
export default AjaxGet;

// export { networkEngine as default } ;
