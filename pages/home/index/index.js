import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import { compose, goPage } from "../../../utils/index";
import {
  getNearbyGymList,
  getNotification,
  closeNotification,
} from "../../../services/index";
import { getSetting, authorize, getLocation } from "../../../utils/wxAuth";
import { baseImgUrl } from "../../../configs/index";
import { isLogin } from "../../../utils/wxAuth";

const nextPageConfig = connect((state) => state.user);
let id = "";
Page(
  compose(nextPageConfig)({
    data: {
      baseImgUrl,
      disable: false,
      msg: "",
      latitude: "",
      longitude: "",
      list: [],
      QRcode: null,
      show: false,
      text: "",
      content: "",
      fontColor: "",
    },
    onLoad() {
      let myComponent = this.selectComponent("#QRcode");
      this.setData({ QRcode: myComponent });
    },
    onShow() {
      if (this.data.log) {
        this.getNotification();
      }
      this.getList();
    },
    async getNotification() {
      const {
        fontColor,
        content,
        notificationStatus,
        notificationId,
      } = await getNotification({
        userId: this.data.userId,
      });
      id = notificationId;
      if (notificationStatus == 1) {
        this.setData({ fontColor, content });
        this.countdown();
      }
    },
    countdown() {
      let num = 5;
      this.setData({ text: `（${num}秒）后可关闭`, show: true });
      const clock = setInterval(() => {
        if (num == 1) {
          clearInterval(clock);
          this.setData({ text: "确定" });
        } else {
          num--;
          this.setData({ text: `（${num}秒）后可关闭` });
        }
      }, 1000);
    },
    toggle() {
      const { show, text } = this.data;
      if (text == "确定") {
        this.setData({ show: !show });
        closeNotification({ notificationId: id });
      }
    },
    async getList() {
      const { latitude, longitude } = this.data;
      const list = (await getNearbyGymList()) || [];
      if (list.length > 0) {
        list.forEach((item) => {
          let imgUrl = [];
          if (item.gymImg) {
            imgUrl = item.gymImg.split(",");
          }
          item.imgUrl = imgUrl;
        });
      }
      this.setData({ list });
    },
    open() {
      isLogin().then(() => {
        goPage("../qrcode/index");
      });
    },
    async getLocation() {
      try {
        //判断是否已授权
        let result = await getSetting("userLocation");
        //未授权唤起授权弹窗
        if (result == "none") {
          result = await authorize("userLocation");
        }
        //判断同意/拒绝
        if (result) {
          this.setData({ disable: false });
        } else {
          this.setData({ disable: true, msg: "定位权限未打开" });
        }
        if (result) {
          const res = await getLocation("wgs84");
          this.setData(
            { latitude: res.latitude, longitude: res.longitude },
            () => {
              this.getList();
            }
          );
        }
      } catch (e) {
        this.setData({ msg: "定位权限未打开" });
      }
    },
  })
);
