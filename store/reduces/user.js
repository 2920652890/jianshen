import {
  getCookie,
  setCookie,
  removeCookie,
  replacePage,
} from "../../utils/wxJsMethods";
import qs from "../../modules/query-string/index";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const SETID = "SETID";

let log = getCookie("LOG") ? true : false;
let userId = log ? getCookie("userId") : "";

let id = getCookie("inviterId");
let inviterId = id ? id : "";

const initState = {
  log,
  userId,
  inviterId,
};

export default function reducer (state = initState, action = {}) {
  switch (action.type) {
    case LOGIN:
      const userId = action.data;
      setCookie("LOGTIME", Date.now())
      setCookie("LOG", true);
      setCookie("userId", userId);
      return {
        ...state,
        log: true,
        userId,
      };
    case LOGOUT:
      if (action.jump) {
        const pages = getCurrentPages();
        const currentPages = pages[pages.length - 1];
        const { route, options } = currentPages;
        const path = `/pages/login/index?from=/${route}&${qs.stringify(options)}`;
        replacePage(path);
      }

      removeCookie("LOG");
      removeCookie("userId");
      removeCookie("LOGTIME");
      return { log: false, userId: "" };
    case SETID:
      let inviterId = action.inviterId || "";
      setCookie("inviterId", inviterId);
      return { ...state, inviterId };
    default:
      return state;
  }
}

//登录
export const login = (data) => ({ type: LOGIN, data });
//登出
export const logout = (jump = true) => ({ type: LOGOUT, jump });

export const setid = (inviterId) => ({ type: SETID, inviterId });
