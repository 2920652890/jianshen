Component({
  //props
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    mode: {
      type: String,
      value: 'top',
    }
  },
  data: {
    cls: '',
  },
  attached () {
    this.changeClass(this.data.mode)
  },
  methods: {
    changeClass (mode) {
      let cls = ''
      switch (mode) {
        case 'top':
          cls = 'lay-top'
          break;
        case 'center':
          cls = 'lay-center'
          break;
        case 'bottom':
          cls = 'lay-bottom'
          break;
      }
      this.setData({ cls })
    },
    hide () {
      this.triggerEvent('change', { value: false })
    }
  },
  options: {
    addGlobalClass: true,// 加入全局样式
  },
})