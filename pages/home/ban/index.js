import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import { compose, makePhoneCall } from "../../../utils/index";
import isLogin from "../../../middleware/isLogin";

const nextPageConfig = connect((state) => state.user);
Page(
  compose(
    nextPageConfig,
    isLogin
  )({
    data: {
      content: "",
      fontColor: "",
      startTime: "",
      endTime: "",
    },
    onLoad(options) {
      const {
        content = "",
        fontColor = "#666",
        startTime = "",
        endTime = "",
      } = options;
      this.setData({ content, fontColor, startTime, endTime });
    },
    call() {
      makePhoneCall("13774320034");
    },
  })
);
