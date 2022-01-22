import { baseImgUrl } from "../../configs/index";

Component({
  data: {
    baseImgUrl,
  },
  properties: {
    item: {
      type: Object,
      value: {},
    },
  },
  methods: {
    handler() {
      this.triggerEvent("bubble", this.data.item);
    },
  },
  options: {
    addGlobalClass: true, // 加入全局样式
  },
});
