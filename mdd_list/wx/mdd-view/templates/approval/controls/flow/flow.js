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
      let model = this.data.mddObject.metadata.model
      let list = model.billflow.approvehistorylinelist
      // 过滤掉 action 为空的流程
      list = list.filter(step => {
        return step.action != ''
      })
      // 在开头默认添加发起申请流程
      let firstSetp = {
        psnid: model.billflow.psnid,
        handlername: model.billflow.makername,
        action: "发起申请",
        handledate: model.billflow.submitdate,
        note: "",
      }
      list = [firstSetp, ...list];
      this.setData({
        historylinelist: list
      })
    },
    onTapUser(e) {
      let psnid = e.currentTarget.dataset.psnid
      this.data.mddObject.callAction('showUserInfo', [psnid])
    }
  }
})