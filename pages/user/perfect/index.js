import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../../modules/redux/injector.js";
import {
  compose,
  Validator,
  showToast,
  formatDate,
  assignData,
  showLoading,
  hideLoading,
  back
} from "../../../utils/index";
import isLogin from "../../../middleware/isLogin";
import { getUserInfo, sendVerifyCode, editUser } from "../../../services/index";

let pedding = false;
let timer = null;
const nextPageConfig = connect(state => state.user);
const now = formatDate().value;
Page(
  compose(
    nextPageConfig,
    isLogin
  )({
    data: {
      send: "获取验证码",
      info: {},
      form: {
        phone: "",
        verifyCode: "",
        username: "",
        gender: "",
        birth: ""
      },
      array: ["未知", "男", "女"],
      now
    },
    onLoad(options) {
      pedding = false;
      this.getData();
    },
    async submit() {
      if (pedding) return;
      const { username, phone, verifyCode, gender, birth } = this.data.form;
      const validator = new Validator();
      if (!phone) {
        validator.add(phone, [
          { rule: "isNonEmpty", errorMsg: "请输入手机号" },
          { rule: "mobile", errorMsg: "请填写正确的手机号" }
        ]);
      }
      if (this.data.info.phone != phone) {
        validator.add(verifyCode, [
          { rule: "isNonEmpty", errorMsg: "请输入验证码" }
        ]);
      }
      validator.add(username, [{ rule: "isNonEmpty", errorMsg: "请输入姓名" }]);
      validator.add(gender, [{ rule: "isNonEmpty", errorMsg: "请选择性别" }]);
      validator.add(birth, [{ rule: "isNonEmpty", errorMsg: "请选择生日" }]);
      let errorMsg = validator.start();
      if (errorMsg) {
        return showToast({ title: errorMsg });
      }
      pedding = true;
      const params = { userId: this.data.userId, username, gender, birth };
      if (this.data.info.phone != phone) {
        params.phone = phone;
        params.verifyCode = verifyCode;
      }
      try {
        showLoading();
        await editUser(params);
        hideLoading();
        showToast({ title: "保存成功", icon: "success" });
        setTimeout(() => {
          back();
        }, 1500);
        pedding = false;
      } catch (e) {
        pedding = false;
      }
    },
    async getData() {
      showLoading();
      const data = await getUserInfo({ userId: this.data.userId });
      const form = assignData(data, this.data.form);
      if (data.gender !== null) {
        form.gender = data.gender;
      }
      this.setData({ info: data, form });
      hideLoading();
    },
    async sendCode() {
      if (this.data.send != "获取验证码") return;
      const validator = new Validator();
      validator.add(this.data.form.phone, [
        { rule: "isNonEmpty", errorMsg: "请输入手机号" },
        { rule: "mobile", errorMsg: "请填写正确的手机号" }
      ]);
      let errorMsg = validator.start();
      if (errorMsg) {
        return showToast({ title: errorMsg });
      }
      try {
        showLoading();
        await sendVerifyCode({ phone: this.data.form.phone });
        hideLoading();
        this.setData({ send: "60S" });
        timer = setInterval(() => {
          if (this.data.send == "1S") {
            clearInterval(timer);
            this.setData({ send: "获取验证码" });
          } else {
            let num = parseInt(this.data.send);
            num--;
            this.setData({ send: `${num}S` });
          }
        }, 1000);
      } catch (e) {}
    },
    input({
      currentTarget: {
        dataset: { key }
      },
      detail: { value }
    }) {
      const { form } = this.data;
      form[key] = value;
      this.setData({ form });
    },
    change(e) {
      const { form } = this.data;
      form.gender = e.detail.value;
      this.setData({ form });
    },
    changeTime(e) {
      const { form } = this.data;
      form.birth = e.detail.value;
      this.setData({ form });
    },
    onUnload() {
      if (timer) {
        clearInterval(timer);
      }
    }
  })
);
