import { MDDObject } from "../mdd-object"

module.exports = Behavior({
    behaviors: [],
    properties: {
        viewid: String,
        metadata: Object,
    },
    lifetimes: {
        ready() {
            this.data.mddObject = MDDObject.instanceOf(this.data.viewid)
            this.loadViews(this.data.metadata)
        }
    },
    methods: {
        loadViews(metadata) {},
    }
})