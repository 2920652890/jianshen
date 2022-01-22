import store from "../store/index";
import { goPage } from "../utils/wxJsMethods";

export const isLogin = () => {
  return new Promise((resolve, reject) => {
    if (store.getState().user.log) {
      resolve(true);
    } else {
      const path = `/pages/login/index?type=back`;
      goPage(path);
      reject(false);
    }
  });
};

// 登录
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(false);
        }
      },
      fail() {
        reject(false);
      }
    });
  });
};

/**
 * @userInfo:         用户信息     wx.getUserInfo
 * @userLocation:     地理位置     wx.getLocation, wx.chooseLocation
 * @address:          通讯地址     wx.chooseAddress
 * @invoiceTitle:     发票抬头     wx.chooseInvoiceTitle
 * @invoice:          获取发票     wx.chooseInvoice
 * @werun:            微信运动步数  wx.getWeRunData
 * @record:           录音功能     wx.startRecord
 * @writePhotosAlbum: 保存到相册   wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum
 * @camera:           摄像头      <camera /> 组件
 */
// 授权检测, 判断是否授权,已授权直接调用api进行操作,
// 未授权  1.展示button 设置open-type,callback 进行授权 2.调用authorize主动发起授权请求
// https://developers.weixin.qq.com/miniprogram/dev/component/button.html
export const getSetting = power => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (res.authSetting[`scope.${power}`]) {
          resolve(res.authSetting[`scope.${power}`]);
        } else {
          resolve("none");
        }
      },
      fail() {
        reject(false);
      }
    });
  });
};

// 主动向用户发起授权请求
export const authorize = power => {
  return new Promise((resolve, reject) => {
    wx.authorize({
      scope: `scope.${power}`,
      success() {
        resolve(true);
      },
      fail() {
        reject(false);
      }
    });
  });
};

//获取用户信息
export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success(res) {
        /**
         * @nickName: 用户昵称
         * @avatarUrl: 用户头像
         * @gender: 性别 0：未知、1：男、2：女
         * @province: 省份
         * @city: 城市
         * @country: 国家
         */
        resolve(res.userInfo);
      },
      fail() {
        reject(false);
      }
    });
  });
};

//获取经纬度
export const getLocation = (type = "gcj02") => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type, // 返回可以用于wx.openLocation的经纬度
      success(res) {
        resolve(res);
      }
    });
  });
};
