'use strict';

const AjaxGet = function( method, url, callback ){

    var settings = {
      async: true,
      crossDomain: true,
      url: "https://leancloud.cn:443/1.1" + url,
      method: method,
      headers: {
        "x-lc-id": "***",
        "x-lc-key": "***",
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
