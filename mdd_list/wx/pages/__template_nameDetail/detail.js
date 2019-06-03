import { MDDObject } from "../../mdd-view/mdd-object"
const app = getApp();

// 审批详情页
Page({
    onLoad: function(options) {
        let metadataUrl = decodeURIComponent(options.metadataUrl)
        let template = options.template || 'approval-detailpage'
        this.setData({
            url: metadataUrl,
            template: template,
        })
    },
})