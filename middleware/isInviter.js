import store from "../store/index";

export default function (pageObj) {
  const _onShow = pageObj.onShow;
  pageObj.onShow = function () {
    const pages = getCurrentPages();
    const currentPages = pages[pages.length - 1];
    const { options } = currentPages;
    if (
      options.inviterId &&
      options.inviterId != store.getState().user.inviterId
    ) {
      store.dispatch({ type: "SETID", inviterId: options.inviterId });
    }
    if (_onShow && typeof _onShow == "function") {
      _onShow();
    }
  };
  return pageObj;
}
