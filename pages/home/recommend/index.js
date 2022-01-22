import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import isLogin from "../../../middleware/isLogin";
import { compose } from "../../../utils/index";
import { getUserInvitedCount } from "../../../services/index";

const nextPageConfig = connect((state) => state.user);
Page(
  compose(
    nextPageConfig,
    isLogin
  )({
    data: {
      info: {},
    },
    onLoad() {
      this.getData();
    },
    async getData() {
      const data = await getUserInvitedCount({ userId: this.data.userId });
      this.setData({ info: data });
    },
    onShareAppMessage() {
      return {
        title: "得耐健身",
        path: `/pages/home/card/index?inviterId=${this.data.userId}`,
      };
    },
  })
);
