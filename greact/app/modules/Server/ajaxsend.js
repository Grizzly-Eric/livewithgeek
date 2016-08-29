'use strict';

let host = 'https://leancloud.cn:443/1.1/' ;

const AjaxSend = function( action, url, data, callback ){

    var settings = {
      async: true,
      crossDomain: true,
      url: "https://leancloud.cn:443/1.1" + url,
      method: action,
      headers: {
        "x-lc-id": "***",
        "x-lc-key": "***",
        "content-type": "application/json",
      },
      data: JSON.stringify(data)
    }

    $.ajax(settings)
    .always(function (response) {
        console.log("ajaxsend-callback-ok");
        callback(response)
    });

    // console.log(settings.data)

}
export default AjaxSend;

// export { networkEngine as default } ;
