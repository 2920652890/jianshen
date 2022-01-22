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
    data: {},
    onLoad(options) {},
    async getUserInfo(e) {
      const { userInfo } = e.detail;
      const code = await login();
      const params = { code, userInfo: JSON.stringify(userInfo) };
      if (this.data.inviterId) {
        params.inviterId = this.data.inviterId;
      }
      const data = await userLogin(params);
      this.setid();
      this.login(data);
      this._back();
    },
  })
);
