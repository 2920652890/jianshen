import { debug } from "../configs/index";
import { showToast } from "../utils/tool";
import qs from "../modules/query-string/index";
import { replacePage } from "../utils/wxJsMethods";
/**
 * 统一封装的ajax请求
 * @base: {String} 请求地址，如果不完整将会被自动补全
 * @data: {Object/String/ArrayBuffe} 请求的参数，尽量只使用Object/Array
 * @config: 部分个性化的配置选项
 * @document: https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html
 * @return Promise instance
 */

const request = function (url = "", data = {}, config = {}) {
  if (config["header"] == null) {
    config["header"] = {};
  }

  return new Promise(function (resolve, reject) {
    try {
      wx.request(
        Object.assign(
          {},
          {
            url,
            data: { ...data },
            success: ({ data }) => {
              const { success } = data;
              if (success) {
                resolve(data.data);
              } else {
                /* const pages = getCurrentPages();
                const currentPages = pages[pages.length - 1];
                const { route, options } = currentPages;
                const path = `/pages/login/index?from=/${route}&${qs.stringify(
                  options
                )}`;
                replacePage(path); */
                showToast({ title: data.errMsg, mask: false, duration: 3000 });
                reject(data.errMsg);
              }
            },
            fail(error) {
              error.code = -1;
              error.msg = "系统繁忙，请重试~";
              showToast({ title: "系统繁忙，请重试~", mask: false });
              reject(error);
            },
            complete: (logs) => debug && console.log(logs.data),
          },
          config
        )
      );
    } catch (error) {
      error.code = -1;
      error.msg = "系统繁忙，请重试~";
      reject(error);
    }
  });
};

//上传图片
export const uploadFile = function (url = "", { filePath, formData = {} }) {
  return new Promise(function (resolve, reject) {
    wx.uploadFile({
      url,
      filePath,
      formData: { ...formData },
      name: "file",
      success({ data: ret }) {
        ret = JSON.parse(ret);
        let { data } = ret;
        try {
          resolve(data);
        } catch (error) {
          reject(error);
        }
      },
      fail(e) {
        reject(e);
      },
    });
  });
};

/**
 * 对ajax进行细致化处理
 * @desc: 提取不同的方法
 */
export function get(url = "", data = {}, config = {}) {
  return request(
    url,
    data,
    Object.assign({}, config, {
      method: "GET",
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
    })
  );
}
export function post(url = "", data = {}, config = {}) {
  return request(
    url,
    data,
    Object.assign({}, config, {
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
    })
  );
}
export function postJSON(url = "", data = {}, config = {}) {
  return request(
    url,
    data,
    Object.assign({}, config, {
      method: "POST",
      header: {
        "content-type": "application/json",
      },
    })
  );
}
