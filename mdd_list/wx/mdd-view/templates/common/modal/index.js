Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    showButtons: {
      type: Boolean,
      value: true
    },
    showOk: {
      type: Boolean,
      value: true
    },
    showCancel: {
      type: Boolean,
      value: true
    },
    okText: {
      type: String,
      value: '确定'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    // 按钮组，有此值时，不显示 ok 和 cancel 按钮
    actions: {
      type: Array,
      value: [
        // { title: '按钮1', style: 'color: red;' }
      ]
    },
  },

  methods: {
    onTapBackground(e) {
      this.triggerEvent('hidden');
    },
    preventTouchmove(e) {
      return
    },
    handleAction({ currentTarget = {} }) {
      const dataset = currentTarget.dataset || {};
      const { index } = dataset;
      this.triggerEvent('click', { index });
    },
    onClickOk() {
      this.triggerEvent('ok');
    },
    onClickCancel() {
      this.triggerEvent('cancel');
    }
  }
});
