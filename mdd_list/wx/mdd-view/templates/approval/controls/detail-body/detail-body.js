import behavior from '../../../component-behavior';

Component({
  behaviors: [behavior],
  lifetimes: {
    ready() {
      let mdd = this.data.mddObject;
    }
  },
  methods: {
    loadViews(metadata) {},
  }
})