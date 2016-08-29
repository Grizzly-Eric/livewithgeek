'use strict';

let host = 'https://leancloud.cn:443/1.1/' ;

const ChangeUser = function( token, userid, data, callback ){

    var settings = {
      async: true,
      crossDomain: true,
      url: "https://leancloud.cn:443/1.1/users/" + userid,
      method: "PUT",
      headers: {
        "x-lc-id": "***",
        "x-lc-key": "***",
        "x-lc-session":token,
        "content-type": "application/json",
      },
      data: JSON.stringify(data)
    }

    $.ajax(settings)
    .always(function (response) {
        console.log("ChangeUserGrouped-callback-ok");
        callback(response)
    });

    // console.log(settings.data)

}
export default ChangeUser;

// export { networkEngine as default } ;
