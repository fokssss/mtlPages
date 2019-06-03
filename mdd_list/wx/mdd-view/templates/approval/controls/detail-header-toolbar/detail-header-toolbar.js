import behavior from '../../../component-behavior';

Component({
  behaviors: [behavior],
  lifetimes: {
    ready() {
      let mdd = this.data.mddObject;
    }
  },
  methods: {
    loadViews(metadata) {
      let items = metadata.controls.map(obj => {
        let { action, properties: { showCaption: title } } = obj
        return {
          action,
          title,
        }
      })
      this.setData({
        items
      })
    },
    onTap(e) {
      let action = e.currentTarget.dataset.action
      this.data.mddObject.callAction(action, [])
    }
  }
})