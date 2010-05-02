function PingfmLib(user_appkey) {
    this.apiKey = "5b2248043eb0d63bd846217cc29c29c2";
    this.userAppKey = user_appkey;
    this.requestTimeout = 60;
    PingfmLib.URLS = {
        BASE: 'http://api.ping.fm/v1/'
    };
}

PingfmLib.prototype = {
    ajaxRequest : function(url, callback, params) {
        if(!params)
            params = {};

        var requestUrl = PingfmLib.URLS.BASE + url;

        $.ajax({
            type: 'POST',
            url: requestUrl,
            data: params,
            dataType: 'xml',

            success: function(data, status) {
                if(!data) {
                    data = [];
                }
                callback(true, data, status);
            },

            error: function (request, status, error) {
                var fmtError = error;
                if(status == 'timeout') {
                    fmtError = "(timeout)";
                } else {
                    try {
                        if(!request.responseText) {
                            throw 'no response';
                        }
                    } catch(e) {
                        fmtError = '"' + error + '"(' + status + ')';
                    }
                }
                callback(false, null, fmtError);
            }
        });
    },

    validateCredentials : function(callback) {
        var params = {
            api_key: this.apiKey,
            user_app_key: this.userAppKey,
        };
        this.ajaxRequest('user.validate', callback, params);
    },

    post : function(callback, msg) {
        var params = {
            api_key: this.apiKey,
            user_app_key: this.userAppKey,
            post_method: "default",
            body: msg
        };
        this.ajaxRequest('user.post', callback, params);
    }
}
