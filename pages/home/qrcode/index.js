import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import {
  compose,
  showToast,
  showLoading,
  makePhoneCall,
  hideLoading,
  showModal,
  goPage,
  replacePage,
} from "../../../utils/index";
import isLogin from "../../../middleware/isLogin";
import { getOpenDoorKey } from "../../../services/index";
import drawQrcode from "../../../modules/weapp-qrcode/weapp.qrcode.min.js";

const nextPageConfig = connect((state) => state.user);
let timer = null;
Page(
  compose(
    nextPageConfig,
    isLogin
  )({
    data: {
      info: {},
      end: false,
    },
    onShow(options) {
      this.draw();
    },
    call() {
      makePhoneCall("13774320034");
    },
    async draw() {
      try {
        showLoading();
        let data = await getOpenDoorKey({
          userId: this.data.userId,
        });
        let { fitnessRecordCode = "", vipEndTime = "", status } = data;
        hideLoading();
        if (status == 0) {
          let {
            content = "",
            fontColor = "",
            startTime = "",
            endTime = "",
          } = data.blackList;
          return replacePage(
            `/pages/home/ban/index?content=${content}&fontColor=${fontColor}&startTime=${startTime}&endTime=${endTime}`
          );
        }
        if (new Date() > vipEndTime) {
          const flag = await showModal({
            content: "您的会员已到期，请前往续费。",
            cancelText: "残忍拒绝",
            confirmText: "前往续费",
          });
          if (flag) {
            return goPage("../card/index");
          }
        }
        let text = `${fitnessRecordCode}-${new Date() - 0}`;
        hideLoading();
        drawQrcode({
          width: 200,
          height: 200,
          canvasId: "myQrcode",
          typeNumber: 10,
          text,
        });
        this.setData({ show: true });
        timer = setTimeout(() => {
          this.draw();
        }, 30000);
      } catch (e) {
        console.log(e);
        showToast({ title: "获取二维码失败" });
      }
    },
    onUnload() {
      if (timer) {
        clearTimeout(timer);
      }
    },
  })
);
