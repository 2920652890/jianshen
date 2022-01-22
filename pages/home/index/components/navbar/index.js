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
    statusBarHeight: '',
    fs: 15,
    fw: 400,
    pd: 0
  },
  methods: {},
  lifetimes: {
    attached: function() {
      let pd = getPixel(App.globalData.navHeight) - App.globalData.navHeight
      this.setData({
        left: getPixel(App.globalData.left),
        navHeight: App.globalData.navHeight,
        statusBarHeight: App.globalData.statusBarHeight,
        fs: getPixel(15),
        fw: getPixel(400),
        pd
      })
    }
  },
  options: {
    addGlobalClass: true, // 加入全局样式
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }
})
