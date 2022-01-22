import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import { goPage } from "../../../utils/index";
import { compose } from "../../../utils/index";
import { getProductList } from "../../../services/index";
import { showLoading, hideLoading } from "../../../utils/index";
import isInviter from "../../../middleware/isInviter";

let pedding = false;
let end = false;
const init = {
  pageNum: 0,
  pageSize: 5,
};
let params = {};

const nextPageConfig = connect((state) => state.user);
Page(
  compose(
    nextPageConfig,
    isInviter
  )({
    data: {
      list: [],
    },
    onLoad(options) {
      params = { ...init };
      pedding = false;
      end = false;
      this.getList();
    },
    async getList() {
      showLoading();
      const list = await getProductList({ userId: this.data.userId });
      this.setData({ list });
      hideLoading();
    },
    bubble({ detail }) {
      goPage(`../confirm/index?productId=${detail.productId}`);
    },
    onReachBottom() {
      if (pedding || end) {
        return;
      }
      pedding = true;
      params.pageNum++;
    },
  })
);
