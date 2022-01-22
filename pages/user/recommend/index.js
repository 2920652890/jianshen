import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import { compose } from "../../../utils/index";
import isLogin from "../../../middleware/isLogin";
import { getUserInvitedUserList } from "../../../services/index";

let pedding = false;
let end = false;
const init = {
  pageNum: 0,
  pageSize: 5
};
let params = {};
const nextPageConfig = connect(state => state.user);
Page(
  compose(
    nextPageConfig,
    isLogin
  )({
    data: {
      list: []
    },
    onLoad(options) {
      params = { ...init };
      pedding = false;
      end = false;
      this.getList();
    },
    async getList() {
      try {
        let op = { ...params, userId: this.data.userId };
        const data = await getUserInvitedUserList(op);
        if (data.length < params.pageSize) {
          end = true;
        }
        const { list } = this.data;
        list.push(...data);
        this.setData({ list });
        pedding = false;
      } catch (e) {
        pedding = false;
      }
    },
    onReachBottom() {
      if (pedding || end) {
        return;
      }
      pedding = true;
      params.pageNum++;
      this.getList();
    }
  })
);
