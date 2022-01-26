import store from "../store/index";
import qs from "../modules/query-string/index";
import { replacePage } from "../utils/wxJsMethods";

export default function (pageObj) {
  if (pageObj.onLoad) {
    const _onLoad = pageObj.onLoad;
    // 使用onLoad的话需要传递options
    pageObj.onLoad = function (options) {
      if (store.getState().user.log) {
        _onLoad.call(this, options);
      } else {
        //跳转到登录页
        const pages = getCurrentPages();
        const currentPages = pages[pages.length - 1];
        const { route, options } = currentPages;
        const path = `/pages/login/index?from=/${route}&${qs.stringify(
          options
        )}`;
        replacePage(path);
      }
    };
  }
  return pageObj;
}
