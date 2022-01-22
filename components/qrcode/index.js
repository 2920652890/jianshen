import regeneratorRuntime from "../../modules/regenerator-runtime/runtime.js";
import drawQrcode from "../../modules/weapp-qrcode/weapp.qrcode.min.js";
import { showLoading, hideLoading } from "../../utils/index";
import { getOpenDoorKey } from "../../services/index";

let pedding = false;
Component({
  data: {
    show: false,
  },
  properties: {
    userId: {
      type: String,
      value: "",
    },
  },
  methods: {
    async draw() {
      if (pedding) return;
      pedding = true;
      try {
        showLoading();
        let text = await getOpenDoorKey({ userId: this.data.userId });
        text = `${text}-${new Date() - 0}`;
        hideLoading();
        drawQrcode({
          width: 200,
          height: 200,
          canvasId: "myQrcode",
          typeNumber: 10,
          text,
          _this: this,
        });
        pedding = false;
        this.setData({ show: true });
      } catch (e) {
        showToast({ title: "获取二维码失败" });
        pedding = false;
      }
    },
    handleTap() {},
    hide() {
      this.setData({ show: false });
    },
  },
  options: {
    addGlobalClass: true, // 加入全局样式
  },
});
