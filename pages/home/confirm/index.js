import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import { compose, showLoading, hideLoading } from "../../../utils/index";
import isLogin from "../../../middleware/isLogin";
import {
  goPage,
  showToast,
  replacePage,
  requestPayment,
} from "../../../utils/index";
import {
  getProductInfo,
  getCouponList,
  createOrder,
} from "../../../services/index";

let pedding = false;
let useIntegral = false;
const nextPageConfig = connect((state) => state.user);
Page(
  compose(
    nextPageConfig,
    isLogin
  )({
    data: {
      checked: true,
      down: true,
      info: {},
      end: false,
      discount: 0,
      total: 0,
      couponList: [],
      coupon: {},
      couponId: "",
      productId: "",
      read: true,
    },
    onLoad(options) {
      const productId = options.productId || 2;
      this.setData({ productId });
      this.getData(productId);
      this.getCouponList(productId);
    },
    async getData(productId) {
      showLoading();
      const data = await getProductInfo({
        userId: this.data.userId,
        productId,
      });
      this.setData({ info: data, end: true }, () => {
        this.computed();
      });
      hideLoading();
    },
    async getCouponList(productId) {
      const couponList = await getCouponList({
        userId: this.data.userId,
        productId,
      });
      this.setData({ couponList });
    },
    async submit() {
      if (!this.data.read) {
        return showToast({
          title: "请先阅读《得耐会员协议》和《得耐隐私政策》",
        });
      }
      if (pedding) return;
      pedding = true;
      showLoading();
      const params = {
        userId: this.data.userId,
        useIntegral: 0,
        productId: this.data.productId,
      };
      if (useIntegral) {
        params.useIntegral = 1;
      }
      if (this.data.couponId) {
        params.couponId = this.data.couponId;
      }
      try {
        const data = await createOrder(params);
        hideLoading();
        pedding = false;
        if (data.orderStatus == 1) {
          return replacePage(
            `../success/index?orderCode=${data.orderCode}&orderStatus=${data.orderStatus}`
          );
        } else {
          await requestPayment(data);
          return replacePage(
            `../success/index?orderCode=${data.orderCode}&orderStatus=${data.orderStatus}`
          );
        }
      } catch (e) {
        pedding = false;
        console.log(e);
      }
    },
    change() {
      let { checked } = this.data;
      checked = !checked;
      this.setData({ checked });
      this.computed();
    },
    computed() {
      const { info, coupon } = this.data;
      const { productPrice, integral, productFirstDiscount } = info;
      let discount = 0;
      let total = productPrice;
      if (info.haveInvitedDiscount) {
        total -= productFirstDiscount;
      }
      if (coupon.couponId) {
        total -= coupon.discount;
      }
      if (this.data.checked && total > 0 && integral > 0) {
        total -= integral * 10;
        useIntegral = true;
        if (total >= 0) {
          discount = integral / 10;
        } else {
          discount = (integral * 10 + total) / 100;
        }
      } else {
        useIntegral = false;
      }
      total = total / 100;
      if (total < 0) {
        total = 0;
      }
      this.setData({ discount, total });
    },
    chooseCoupon({
      currentTarget: {
        dataset: { item },
      },
    }) {
      this.setData({ coupon: item, couponId: item.couponId });
      this.computed();
    },
    clearCoupon() {
      this.setData({ couponId: "", coupon: {} });
      this.computed();
    },
    goWeb() {
      goPage("../agreement/index");
    },
    toggle() {
      let { read } = this.data;
      this.setData({ read: !read });
    },
    show() {
      let { down } = this.data;
      down = !down;
      this.setData({ down });
    },
  })
);
