const App = getApp()

Component({
  //props
  properties: {
    title: {
      type: String,
      value: ''
    }
  },
  data: {
    left: '',
    navH: '',
    statusBarHeight: ''
  },
  methods: {
    onBack() {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  lifetimes: {},
  options: {
    addGlobalClass: true, // 加入全局样式
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }
})
