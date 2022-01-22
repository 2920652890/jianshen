import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import { compose, showLoading, hideLoading } from "../../../utils/index";
import isLogin from "../../../middleware/isLogin";
import { getUserRankInfo, getUserInfo } from "../../../services/index";

const nextPageConfig = connect(state => state.user);
Page(
  compose(
    nextPageConfig,
    isLogin
  )({
    data: {
      info: {},
      end: true
    },
    onLoad() {
      this.getData();
    },
    async getData() {
      showLoading();
      const ret = await getUserInfo({ userId: this.data.userId });
      const data = await getUserRankInfo({ userId: this.data.userId });
      data.avatarUrl = ret.avatarUrl;
      data.username = ret.username;
      this.setData({ info: data, end: true });
      hideLoading();
    }
  })
);
