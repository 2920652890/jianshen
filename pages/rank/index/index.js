import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import { compose } from "../../../utils/index";
import isLogin from "../../../middleware/isLogin";
import { getRankList, getUserRankInfo } from "../../../services/index";

let pedding = false;
let end = false;
const init = {
  pageNum: 0,
  pageSize: 20,
};
let params = {};
const nextPageConfig = connect((state) => state.user);
Page(
  compose(
    nextPageConfig,
    isLogin
  )({
    data: {
      type: "1",
      typeList: [
        { n: "月度榜单", v: "1" },
        { n: "季度榜单", v: "2" },
        /* { n: "半年榜单", v: "3" }, */
        { n: "全年榜单", v: "4" },
      ],
      info: {},
      list: [],
    },
    onLoad() {
      params = { ...init };
      pedding = false;
      end = false;
      this.setData({ list: [] });
      this.getData();
      this.getList();
    },
    async getData() {
      const data = await getUserRankInfo({ userId: this.data.userId });
      this.setData({ info: data });
    },
    async getList(done) {
      try {
        let op = { ...params, userId: this.data.userId, type: this.data.type };
        const data = await getRankList(op);
        if (data.length > 0) {
          data.forEach((item) => {
            item.hour = Math.floor(item.duration / 3600) || 0;
            item.min = Math.floor(item.duration / 60) % 60 || 0;
          });
        }
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
      if (done && typeof done == "function") {
        done();
      }
    },
    change({
      currentTarget: {
        dataset: { item },
      },
    }) {
      params = { ...init };
      end = false;
      this.setData({ list: [], type: item.v }, () => {
        this.getList();
      });
    },
    onPullDownRefresh() {
      params = { ...init };
      end = false;
      this.setData({ list: [] }, () => {
        this.getList(wx.stopPullDownRefresh);
      });
    },
    onReachBottom() {
      if (pedding || end) {
        return;
      }
      pedding = true;
      params.pageNum++;
      this.getList();
    },
  })
);
