// 消息提示框
export const showToast = (options) => {
  let _init = {
    title: "提示", // 提示的内容
    icon: "none", // 图标，有效值 "success", "loading", "none"
    image: "", // 自定义图标的本地路径，image 的优先级高于 icon
    duration: 1500, // 提示的延迟时间，单位毫秒，默认：1500
    mask: true, // 是否显示透明蒙层，防止触摸穿透，默认：false
    success: null, // 接口调用成功的回调函数
    fail: null, // 接口调用失败的回调函数
    complete: null, // 接口调用结束的回调函数
  };
  let params = { ..._init, ...options };
  wx.showToast(params);
};

// loading 提示框
export const showLoading = (options) => {
  let _init = {
    title: "正在加载", // 提示的内容
    mask: true, // 是否显示透明蒙层，防止触摸穿透，默认：false
    success: null, // 接口调用成功的回调函数
    fail: null, // 接口调用失败的回调函数
    complete: null, // 接口调用结束的回调函数
  };
  let params = { ..._init, ...options };
  wx.showLoading(params);
};

export const hideLoading = () => {
  wx.hideLoading();
};

// 显示模态弹窗
export const showModal = (options) => {
  return new Promise((resolve, reject) => {
    let _init = {
      title: "提示", // 提示的标题
      content: "", // 提示的内容
      showCancel: true, // 是否显示取消按钮
      cancelText: "取消", // 取消按钮的文字
      cancelColor: "#000000", // 取消按钮的文字颜色
      confirmText: "确定", // 确定按钮的文字
      confirmColor: "#3CC51F", // 确定按钮的文字颜色
      success({ confirm, cancel }) {
        if (confirm) {
          return resolve(true);
        }
        if (cancel) {
          resolve(false);
        }
      },
      fail: null, // 接口调用失败的回调函数
      complete: null, // 接口调用结束的回调函数
    };
    let params = { ..._init, ...options };
    wx.showModal(params);
  });
};

// 操作菜单
export const showActionSheet = (options) => {
  let _init = {
    itemList: [], // 按钮的文字数组，数组长度最大为6个
    itemColor: "#000000", // 按钮的文字颜色
    success: null, //function({tapIndex}){ }, 接口调用成功的回调函数
    fail: null, //function({errMsg}){ } // 接口调用失败的回调函数
    complete: null, // 接口调用结束的回调函数
  };
  let params = { ..._init, ...options };
  wx.showActionSheet(params);
};

// 预览图片
export const previewImage = (options) => {
  let _init = {
    current: "", // 当前显示图片的链接，不填则默认为 urls 的第一张
    urls: [], // 需要预览的图片链接列表
    success: null, // 接口调用成功的回调函数
    fail: null, // 接口调用失败的回调函数
    complete: null, // 接口调用结束的回调函数
  };
  let params = { ..._init, ...options };
  wx.previewImage(params);
};
