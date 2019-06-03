import { MDDObject } from "../mdd-object"

module.exports = Behavior({
    behaviors: [],
    properties: {
        viewid: String,
        metadata: Object
    },
    lifetimes: {
        ready() {
            let mdd = MDDObject.instanceOf(this.data.viewid)
            this.data.mddObject = mdd

            this.triggerEvent('userextend', { event: 'loadViews', viewid: this.data.viewid })
            this.loadViews(this.data.metadata)
        }
    },
    methods: {
        loadViews(metadata) {},
        requestAction(params, success) {
            let method = params.httpMethod;
            wx.request({
                url: params.url,
                data: params.data,
                method: method,
                header: {
                    'content-type': 'application/json'
                },
                success: success,
            })
        },
    },
})