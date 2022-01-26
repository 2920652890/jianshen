import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import { compose, showLoading, hideLoading } from "../../../utils/index";
import isLogin from "../../../middleware/isLogin";
import { getUserInfo } from "../../../services/index";

const nextPageConfig = connect(state => state.user);
Page(
  compose(
    nextPageConfig,
    isLogin
  )({
    data: {
      info: {},
      end: false
    },
    onLoad (options) {

    },
    onShow () {
      if (this.data.log) {
        this.getData();
      }
    },
    async getData () {
      showLoading();
      const data = await getUserInfo({ userId: this.data.userId });
      this.setData({ info: data });
      hideLoading();
    }
  })
);
