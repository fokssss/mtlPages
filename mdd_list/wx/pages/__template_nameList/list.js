//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad: function(options) {
        //Do some initialize when page load.
        let metadataUrl = `http://x5sga4gn.c87e2267-1001-4c70-bb2a-ab41f3b81aa3.app.yyuap.com/billmeta/getbill?billno=myapprove&bIncludeViewModel=true&tenantCode=h4q69gc0_NCApproval&userCode=ff&id=dfdf`
        let template = options.template || 'approval-listpage'
        this.setData({
            url: metadataUrl,
            template: template,
        })
    },
    onReady: function() {
        //Do some when page ready.

    },
    onShow: function() {
        //Do some when page show.

    },
    onHide: function() {
        //Do some when page hide.

    },
    onUnload: function() {
        //Do some when page unload.

    },
    onPullDownRefresh: function() {
        //Do some when page pull down.

    }
})