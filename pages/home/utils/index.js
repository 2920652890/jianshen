import regeneratorRuntime from "../../../modules/regenerator-runtime/runtime.js";
import { getGymApparatusList } from "../../../services/index";
import { baseImgUrl } from "../../../configs/index";
import { goPage } from "../../../utils/index";
import { isLogin } from "../../../utils/wxAuth";

Page({
  data: {
    baseImgUrl,
    gymId: "",
    gymAddress: "",
    list: [],
  },
  onLoad(options) {
    const gymId = options.gymId || "1";
    const gymAddress = options.gymAddress || "";
    this.setData({ gymId, gymAddress });
    this.getList(gymId);
  },
  go({
    currentTarget: {
      dataset: { item },
    },
  }) {
    isLogin().then(() => {
      goPage(
        `../form/index?gymApparatusId=${item.gymApparatusId}&gymAddress=${this.data.gymAddress}`
      );
    });
  },
  async getList(gymId) {
    const list = await getGymApparatusList({ gymId });
    this.setData({ list });
  },
});
