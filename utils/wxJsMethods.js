//获取节点
export const querySelector = (selector) => {
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery();
    query
      .select(selector)
      .boundingClientRect((ret) => {
        resolve(ret);
      })
      .exec();
  });
};

//返回
export const back = () => {
  wx.navigateBack({
    delta: 1,
  });
};

//跳转页面
export const goPage = (url) => {
  wx.navigateTo({
    url,
    fail() {
      wx.switchTab({ url });
    },
  });
};

//替换页面
export const replacePage = (url) => {
  wx.redirectTo({
    url,
    fail() {
      wx.switchTab({ url });
    },
  });
};

//切换tab页
export const switchTab = (url) => {
  wx.switchTab({ url });
};

//隐藏分享功能
export const hideShareMenu = () => {
  wx.hideShareMenu();
};

//设置页面标题
export const setNavTitle = (title) => {
  wx.setNavigationBarTitle({ title });
};

//本地存储
export const setCookie = (key, val) => {
  wx.setStorageSync(key, val);
};

//获取
export const getCookie = (key) => {
  let cookie = wx.getStorageSync(key);
  return cookie;
};

//移除
export const removeCookie = (key) => {
  wx.removeStorageSync(key);
};

//移除全部
export const clearCookie = () => {
  wx.clearStorageSync();
};

// 拨打电话
export const makePhoneCall = (phoneNumber) => {
  wx.makePhoneCall({ phoneNumber });
};

// 将页面滚动到目标位置
export const pageScrollTo = (scrollTop = 0, duration = 300) => {
  wx.pageScrollTo({
    scrollTop,
    duration,
  });
};

// 微信支付
export const requestPayment = (data) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success(res) {
        resolve(res);
      },
      fail(res) {
        reject(res);
      },
    });
  });
};

// 保存图片到本地
export const downloadFile = (imgSrc) => {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: imgSrc,
      success({ tempFilePath }) {
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success() {
            wx.showToast({
              title: "保存成功",
              icon: "success",
              duration: 2000,
            });
            resolve("ok");
          },
          fail() {
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              reject("用户未授权");
            } else {
              reject("图片保存失败");
            }
          },
        });
      },
      fail() {
        reject("图片下载失败");
      },
    });
  });
};

//获取图片
export function chooseImage() {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sizeType: "compressed",
      sourceType: ["album", "camera"],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        resolve(tempFilePaths);
      },
      fail() {
        reject("error");
      },
    });
  });
}
