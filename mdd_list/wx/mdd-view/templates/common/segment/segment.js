import behavior from '../../component-behavior';
Component({
    behaviors: [behavior],
    methods: {
        loadViews(metadata) {
            this.setData({
                segments: metadata
            })
            let segment = this.data.segments[0]
            this.data.mddObject.callAction(segment.action, [segment.dataSource, segment.action])
        },
        onSegment(e) {
            let index = e.currentTarget.dataset.idx

            if (this.data.segments[index].selected) {
                return
            }
            let segment = this.data.segments[index]
            let segments = this.data.segments.map((obj, idx) => {
                obj.selected = idx == index
                return obj
            })
            this.setData({
                segments: segments
            })
            this.triggerEvent('changed', { selectedIndex: index })
            this.data.mddObject.callAction(segment.action, [segment.dataSource, segment.action])
        }
    }
})