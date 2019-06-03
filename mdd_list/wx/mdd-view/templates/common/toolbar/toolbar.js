import behavior from '../../component-behavior';

Component({
  behaviors: [behavior],

  methods: {
    loadViews(metadata) {
      
    },
    onTap(e) {
      let action = e.currentTarget.dataset.action;      
      this.triggerEvent('click', { action })
    }
  }
})