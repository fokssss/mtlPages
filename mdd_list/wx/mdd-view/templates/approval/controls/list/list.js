import behavior from '../../../component-behavior';

Component({
  behaviors: [behavior],
  data: {
    pageIndex: 1,
    isNoMoreData: false,
    rowItems: [],
  },
  lifetimes: {
    ready() {
      let mdd = this.data.mddObject;
      let dataSource = this.data.metadata.dataSource;
      let bindField = this.data.metadata.bindField;
      this.data.mddObject.addObserver((oldVal, newVal) => {
        let { data, isNoMoreData, pageIndex } = newVal
        this.setData({
          pageIndex,
          isNoMoreData,
          rowItems: data,
        })
        this.data.loading = false;
      }, dataSource, bindField);
    }
  },
  methods: {
    loadViews(metadata) {
      let toolbar = metadata.containers.find(obj => obj.controlType == 'Toolbar')
      if (toolbar) {
        let controls = toolbar.controls.sort((a, b) => {
          return a.properties.order > b.properties.order
        })
        let buttons = controls.map((obj, idx) => {
          let style = obj.properties.showCaption == '同意' ? 'agreeBtn' : 'rejectBtn';
          return {
            title: obj.properties.showCaption,
            action: obj.action,
            style: style
          }
        })
        this.setData({
          buttons: buttons
        })
      }
    },
    _doRefresh() {
      if (this.data.loading) {
        return;
      }
      this.data.loading = true
      let dataSource = this.data.metadata.dataSource;
      let bindField = this.data.metadata.bindField;
      this.triggerEvent('refresh', { dataSource, bindField })
    },
    onTapButton(e) {
      let { action, id } = e.currentTarget.dataset
      this.data.mddObject.callAction(action, [id])
    },
    onDetail(e) {
      let id = e.currentTarget.dataset.id
      this.data.mddObject.callAction('cmdDetail', [id])
    },
    onRefresh(e) {
      let { offset, distance } = e;
      if (offset > distance) {
        this._doRefresh()
      }
      let animation = wx.createAnimation({
        duration: 500
      })
      animation.translateY(-60).step()
      this.setData({
        animationData: animation.export(),
      })
    },
    onScrollToLower(e) {
      if (this.data.loading) {
        return
      }
      if (this.data.isNoMoreData) {
        return
      }
      this.data.loading = true
      let dataSource = this.data.metadata.dataSource;
      let bindField = this.data.metadata.bindField;
      let pageIndex = this.data.metadata.pageIndex;
      this.triggerEvent('scrolltolower', { dataSource, bindField, pageIndex })
    }
  }
})