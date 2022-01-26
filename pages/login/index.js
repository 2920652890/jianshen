import regeneratorRuntime from "../../modules/regenerator-runtime/runtime.js";
import { connect } from "../../modules/redux/injector.js";
import { bindActionCreators } from "../../modules/redux/redux.min.js";
import * as userActions from "../../store/reduces/user.js";
import { login } from "../../utils/wxAuth";
import { userLogin } from "../../services/index";
import { compose } from "../../utils/index";
import loginBack from "../../middleware/loginBack";

const app = getApp();

const nextPageConfig = connect(
  (state) => state.user,
  (dispatch) => bindActionCreators(userActions, dispatch)
);
Page(
  compose(
    loginBack,
    nextPageConfig
  )({
    data: {
      canIUseGetUserProfile: false,
    },
    onLoad (options) {
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    },
    getUserProfile (e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.submit(res.userInfo)
        }
      })
    },
    async getUserInfo (e) {
      const { userInfo } = e.detail;
      this.submit(userInfo)
    },
    async submit (userInfo) {
      const code = await login();
      const params = { code, userInfo: JSON.stringify(userInfo) };
      if (this.data.inviterId) {
        params.inviterId = this.data.inviterId;
      }
      const data = await userLogin(params);
      this.setid();
      this.login(data);
      this._back();
    }
  })
);
