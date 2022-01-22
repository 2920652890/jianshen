import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { chooseImage } from "../../../utils/index";
import isLogin from "../../../middleware/isLogin";
import {
  compose,
  showLoading,
  hideLoading,
  showToast,
  back,
  Validator,
} from "../../../utils/index";
import { connect } from "../../../modules/redux/injector.js";
import { uploadRepairsImg, repairs } from "../../../services/index";

let pedding = false;
const nextPageConfig = connect((state) => state.user);
Page(
  compose(
    nextPageConfig,
    isLogin
  )({
    data: {
      list: [],
      gymApparatusId: "",
      repairsDesc: "",
      gymAddress: "",
    },
    onLoad(options) {
      pedding = false;
      const gymApparatusId = options.gymApparatusId || "1";
      const gymAddress = options.gymAddress || "";
      this.setData({ gymApparatusId, gymAddress });
    },
    async submit() {
      if (pedding) return;
      const validator = new Validator();
      const { list, repairsDesc, gymApparatusId } = this.data;
      validator.add(list, [
        { rule: "minLength:0", errorMsg: "请上传报修图片" },
      ]);
      validator.add(repairsDesc, [
        { rule: "isNonEmpty", errorMsg: "请输入报修描述" },
      ]);
      let errorMsg = validator.start();
      if (errorMsg) {
        return showToast({ title: errorMsg });
      }
      const params = {
        userId: this.data.userId,
        gymApparatusId,
        repairsDesc,
        repairsImg: list.join(","),
      };

      try {
        showLoading();
        await repairs(params);
        hideLoading();
        showToast({ title: "提交成功", icon: "success" });
        setTimeout(() => {
          back();
        }, 1500);
        pedding = false;
      } catch (e) {
        pedding = false;
      }
    },
    async add() {
      try {
        const tempFilePaths = await chooseImage();
        showLoading();
        const data = await uploadRepairsImg({ filePath: tempFilePaths[0] });
        hideLoading();
        let { list } = this.data;
        list = [...list, data];
        this.setData({ list });
      } catch (e) {
        showToast({ title: e });
      }
    },
    input({ detail: { value } }) {
      this.setData({ repairsDesc: value });
    },
    remove({
      currentTarget: {
        dataset: { index },
      },
    }) {
      let { list } = this.data;
      list.splice(index, 1);
      this.setData({ list });
    },
  })
);
