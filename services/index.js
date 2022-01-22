import { baseUrl } from "../configs/index";
import { post, uploadFile } from "../request/index";

//登陆
export function userLogin(params) {
  return post(`${baseUrl}/user/wechatLogin`, params);
}

//用户消息
export function getNotification(params) {
  return post(`${baseUrl}/user/getNotification`, params);
}

//用户消息
export function closeNotification(params) {
  return post(`${baseUrl}/user/closeNotification`, params);
}

//用户信息
export function getUserInfo(params) {
  return post(`${baseUrl}/user/getUserInfo`, params);
}

//发送验证码
export function sendVerifyCode(params) {
  return post(`${baseUrl}/user/sendVerifyCode`, params);
}

//更新用户信息
export function editUser(params) {
  return post(`${baseUrl}/user/updateUserInfo`, params);
}

//获取用户推荐信息
export function getUserInvitedCount(params) {
  return post(`${baseUrl}/user/getUserInvitedCount`, params);
}

//获取用户推荐列表
export function getUserInvitedUserList(params) {
  return post(`${baseUrl}/user/getUserInvitedUserList`, params);
}

//获取优惠券列表
export function getUserCouponList(params) {
  return post(`${baseUrl}/user/getUserCouponList`, params);
}

//运动记录页面-我的数据
export function getFitnessStatistics(params) {
  return post(`${baseUrl}/user/getFitnessStatistics`, params);
}

//运动记录页面-数据列表
export function getFitnessRecordList(params) {
  return post(`${baseUrl}/user/getFitnessRecordList`, params);
}

//积分记录页面-数据列表
export function getIntegralRecordList(params) {
  return post(`${baseUrl}/user/getIntegralRecordList`, params);
}

//订单记录页面-数据列表
export function getFitnessOrderList(params) {
  return post(`${baseUrl}/user/getFitnessOrderList`, params);
}

//首页-附近门店
export function getNearbyGymList(params) {
  return post(`${baseUrl}/gym/getNearbyGymList`, params);
}

//获取门店详情
export function getGymInfo(params) {
  return post(`${baseUrl}/gym/getGymInfo`, params);
}

//获取门店器械列表
export function getGymApparatusList(params) {
  return post(`${baseUrl}/gym/getGymApparatusList`, params);
}

//上传报修图片
export function uploadRepairsImg(params) {
  return uploadFile(`${baseUrl}/gym/uploadRepairsImg`, params);
}

//报修
export function repairs(params) {
  return post(`${baseUrl}/gym/repairs`, params);
}

//我的排行
export function getUserRankInfo(params) {
  return post(`${baseUrl}/rank/getUserRankInfo`, params);
}

//排行
export function getRankList(params) {
  return post(`${baseUrl}/rank/getRankList`, params);
}

//开门
export function getOpenDoorKey(params) {
  return post(`${baseUrl}/gym/getOpenDoorKey`, params);
}

//获取会员卡列表
export function getProductList(params) {
  return post(`${baseUrl}/pay/getProductList`, params);
}

//获取确认订单页面详情
export function getProductInfo(params) {
  return post(`${baseUrl}/pay/getProductInfo`, params);
}

//查询可用红包
export function getCouponList(params) {
  return post(`${baseUrl}/pay/getCouponList`, params);
}

//支付
export function createOrder(params) {
  return post(`${baseUrl}/pay/createOrder`, params);
}

//支付结果查询
export function getOrderStatus(params) {
  return post(`${baseUrl}/pay/getOrderStatus`, params);
}
