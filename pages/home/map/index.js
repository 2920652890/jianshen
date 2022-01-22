import { openLocation } from "../../../utils/wxJsMethods";

Page({
  data: {},
  onLoad(options) {
    const { latitude, longitude } = options;
    openLocation({ latitude, longitude });
  }
});
