import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import { compose, showLoading, hideLoading } from "../../../utils/index";
import isLogin from "../../../middleware/isLogin";
import { getOrderStatus } from "../../../services/index";

let timer = null;
const nextPageConfig = connect((state) => state.user);
Page(
  compose(
    nextPageConfig,
    isLogin
  )({
    data: {
      msg: "正在查询...",
    },
    onLoad(options) {
      const orderCode = options.orderCode || "testidjasidjasjsadiordercode";
      const orderStatus = options.orderStatus || 2;
      if (orderStatus !== 1) {
        showLoading();
        this.queryOrder(orderCode);
        timer = setInterval(() => {
          this.queryOrder(orderCode);
        }, 3000);
      } else {
        this.setData({ msg: "恭喜您支付成功!" });
      }
    },
    queryOrder(orderCode) {
      getOrderStatus({ orderCode }).then(
        (data) => {
          if (data == 1) {
            clearInterval(timer);
            this.setData({ msg: "恭喜您支付成功!" });
            hideLoading();
          }
        },
        (err) => {
          this.setData({ msg: err });
          clearInterval(timer);
        }
      );
    },
    onShareAppMessage() {
      return {
        title: "得耐健身",
        path: `/pages/home/index/index?inviterId=${this.data.userId}`,
      };
    },
    onUnload() {
      if (timer) {
        clearInterval(timer);
      }
    },
  })
);
