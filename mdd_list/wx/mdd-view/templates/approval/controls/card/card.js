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
      let model = this.data.mddObject.metadata.model;
      // TODO: modelpath
      let modelpath = metadata.modelpath
      model = modelpath ? model[modelpath][0] : model;
      let items = metadata.controls.map(obj => {
        let { bindField, properties: { showCaption: title } } = obj
        let content = model && bindField && model[bindField]
        return {
          bindField,
          title,
          content: content,
        }
      })
      this.setData({
        items
      })
    },
  }
})