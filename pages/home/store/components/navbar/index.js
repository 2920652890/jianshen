const App = getApp()
function getPixel(num, designWidth = 375) {
  return (num * App.globalData.screenWidth) / designWidth
}
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
    navHeight: '',
    statusBarHeight: ''
  },
  methods: {
    onBack() {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  lifetimes: {
    attached: function() {
      this.setData({
        left: getPixel(App.globalData.left),
        navHeight: App.globalData.navHeight,
        statusBarHeight: App.globalData.statusBarHeight
      })
    }
  },
  options: {
    addGlobalClass: true, // 加入全局样式
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }
})
