import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import { compose, formatDate } from "../../../utils/index";
import isLogin from "../../../middleware/isLogin";
import {
  getFitnessStatistics,
  getUserInfo,
  getFitnessRecordList,
} from "../../../services/index";

const now = `${formatDate().value} 00:00`.replace(/(-)/g, "/");
const today = new Date(now);
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
    isLogin
  )({
    data: {
      info: {},
      perv: "",
      list: [],
      load: false,
    },
    onLoad(options) {
      params = { ...init };
      pedding = false;
      end = false;
      this.getData();
      this.getList();
    },
    async getData() {
      const ret = await getUserInfo({ userId: this.data.userId });
      const data = await getFitnessStatistics({ userId: this.data.userId });
      data.avatarUrl = ret.avatarUrl;
      this.setData({ info: data });
    },
    async getList() {
      try {
        let op = { ...params, userId: this.data.userId };
        const data = await getFitnessRecordList(op);
        if (params.pageNum == 0 && data.length > 0) {
          const perv = this.countdown(data[0].startTime);
          this.setData({ perv });
        }
        if (data.length < params.pageSize) {
          end = true;
        }
        data.forEach((item) => {
          item.long = (item.duration / 60).toFixed(1);
        });
        const { list } = this.data;
        list.push(...data);
        this.setData({ list, load: true });
        pedding = false;
      } catch (e) {
        console.log(e);
        pedding = false;
      }
    },
    countdown(val) {
      if (typeof val == "string") {
        const time = new Date(val.replace(/(-)/g, "/"));
        if (time < today) {
          const ms = Math.abs(today - time);
          const days = Math.floor(ms / (24 * 3600 * 1000));
          return `${days}天前`;
        }
        if (time >= today) {
          return "今天";
        }
        return val;
      }
      return "";
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
