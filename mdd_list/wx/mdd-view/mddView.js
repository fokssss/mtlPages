import { MDDObject } from "./mdd-object"
import { u8cParse } from "./utils/u8cParser"
let app = getApp()
Component({

    properties: {
        url: String,
        template: String,
    },

    data: {},

    lifetimes: {
        detached() {
            if (this.data.mddObject) {
                // mdd-view 移除时，销毁 mddObject。
                this.data.mddObject.destroy()
            }
        }
    },

    observers: {
        'url, template': function(url, template) {
            if (url && url.length > 0 && template && template.length > 0) {
                if (app.globalData.enableMock) {
                    let originMetadata = null;
                    if (this.data.url.includes('myinitiate')) {
                        originMetadata = myinitiateMetadata.data
                    } else if (this.data.url.includes('myapprove')) {
                        originMetadata = metadata.data;
                    } else if (this.data.template == 'approval-detailpage') {
                        originMetadata = metadata_detail.data
                    }
                    originMetadata && this.onLoadData(originMetadata);
                } else {
                    this.requestMetadata()
                }
            }
        }
    },

    methods: {
        onLoadData(originMetadata) {
            let data = JSON.parse(JSON.stringify(originMetadata));
            let metadata = u8cParse(data);
            let mddObject = new MDDObject();
            mddObject.metadata = metadata;
            mddObject.actions = metadata.view.actions;
            let viewid = mddObject.identifier;
            this.data.mddObject = mddObject;
            this.setData({
                viewid: viewid,
                metadata: metadata
            });
        },
        requestMetadata() {
            wx.request({
                url: this.data.url,
                data: {},
                header: {},
                method: 'POST',
                success: (result) => {
                    if (result.statusCode == 200) {
                        if (result.data.code == 200) {
                            let originMetadata = result.data.data;
                            this.onLoadData(originMetadata);
                        } else {
                            wx.showToast({
                                title: "${result.data.message}",
                                icon: 'none',
                                image: '',
                                duration: 1500,
                                mask: false,
                                success: (result) => {

                                },
                                fail: () => {},
                                complete: () => {}
                            });
                        }

                    } else {
                        wx.showToast({
                            title: "${result.errMsg}",
                            icon: 'none',
                            image: '',
                            duration: 1500,
                            mask: false,
                            success: (result) => {

                            },
                            fail: () => {},
                            complete: () => {}
                        });
                    }
                },
                fail: () => {},
                complete: () => {}
            });
        },
        onUserExtend(e) {
            this.triggerEvent(e.type, e.detail)
        },
        onExternalEvent(e) {
            let comp = this.selectComponent('#template')
            comp.onExternalEvent(e)
        },
    }

})