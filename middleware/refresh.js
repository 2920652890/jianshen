import store from "../store/index";
import { remove } from "../store/reduces/stack";

export default function(pageObj) {
  let { name, onLoad, onShow } = pageObj;
  let __load = false;
  let _onShow = null;
  //重置标识符
  if (onLoad) {
    pageObj.onLoad = function(options) {
      __load = false;
      onLoad.call(this, options);
    };
  }
  //暂存onShow
  if (onShow) {
    _onShow = onShow;
  }
  pageObj.onShow = function() {
    if (_onShow) {
      _onShow().call(this);
    }
    //是否第一次加载
    if (!__load) {
      __load = true;
      return;
    }
    //判断是否需要调用refresh函数
    let { pages } = store.getState().stack;
    if (pages.includes(name)) {
      if (this.refresh && typeof this.refresh == "function") {
        this.refresh();
        store.dispatch(remove(name));
      }
    }
  };
  return pageObj;
}
