//app.js
App({
    onLaunch: function() {
        let _this = this;
        let postData = {
            tenantCode: "h4q69gc0_NCApproval",
            userName: "dd",
            password: "a111111",
            systemType: "NC",
            terminalType: "3"
        };
        wx.request({
            url: _this.globalData.loginUrl,
            data: postData,
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            success(res) {
                wx.hideLoading();
                if (res.statusCode == 200) {

                    if (res.data.errcode == 0) {
                        // 跳转至业务页面
                        wx.setStorageSync("token", res.data.data);
                        wx.setStorageSync("tenantCode", "h4q69gc0_NCApproval");
                        wx.setStorageSync("username", "dd");
                    } else {
                        app.util.netError(res.data.errcode, res.data.errmsg, _this.bind);
                    }
                } else {}
            },
            fail: () => { wx.hideLoading(); },
            complete: () => { wx.hideLoading(); }
        })
    },
    onShow: function() {

    },
    onHide: function() {

    },
    globalData: {
        enableMock: false,
        urlPrefix: "http://x5sga4gn.c87e2267-1001-4c70-bb2a-ab41f3b81aa3.app.yyuap.com/",
        loginUrl: `http://x5sga4gn.c87e2267-1001-4c70-bb2a-ab41f3b81aa3.app.yyuap.com/login/bizLogin`
    },
})