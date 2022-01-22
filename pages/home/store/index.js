import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import {
  compose,
  showLoading,
  hideLoading,
  makePhoneCall,
  goPage,
} from "../../../utils/index";
import { getGymInfo } from "../../../services/index";
import { baseImgUrl } from "../../../configs/index";
import { isLogin } from "../../../utils/wxAuth";

const serv = [
  { n: "无线上网", v: "1" },
  { n: "储物柜", v: "2" },
  { n: "智能空调", v: "3" },
  { n: "免水消毒洗手液", v: "4" },
  { n: "卫生间", v: "5" },
  { n: "更衣室", v: "6" },
];

const nextPageConfig = connect((state) => state.user);
Page(
  compose(nextPageConfig)({
    data: {
      baseImgUrl,
      current: 0,
      menu: [
        { n: "场地介绍", v: 0 },
        { n: "入店须知", v: 1 },
      ],
      info: {},
      gymId: "",
      serv: [],
      end: true,
      QRcode: null,
    },
    onLoad(options) {
      const gymId = options.gymId || 1;
      this.setData({ gymId });
      this.getData(gymId);
      let myComponent = this.selectComponent("#QRcode");
      this.setData({ QRcode: myComponent });
    },
    async getData(gymId) {
      try {
        showLoading();
        const data = await getGymInfo({ gymId });
        let imgUrl = [];
        if (data.gymImg) {
          imgUrl = data.gymImg.split(",");
        }
        data.imgUrl = imgUrl;
        if (data.gymService) {
          const list = [];
          const op = data.gymService.split(",");
          serv.forEach((item) => {
            if (op.includes(item.v)) {
              list.push(item);
            }
          });
          this.setData({ serv: list });
        }
        this.setData({ info: data, end: true });
        hideLoading();
      } catch (e) {
        console.log(e);
        hideLoading();
      }
    },
    open() {
      isLogin().then(() => {
        goPage("../qrcode/index");
      });
    },
    change({
      currentTarget: {
        dataset: { v: current },
      },
    }) {
      this.setData({ current });
    },
    call() {
      makePhoneCall(this.data.info.gymPhone);
    },
  })
);
