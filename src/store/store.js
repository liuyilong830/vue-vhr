import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex)

const state = {
  userInfo: {},  // 登录用户信息
  users: [],  // 获取到的所有用户信息
  weather: {},  // 天气信息
  self: [],  // 获取学生教师自己的信息
  tasks: [],  // 保存具体某一天的所有的考勤任务
  taskStatus: [],  // 保存某一个学生在指定日期中签到情况
  attendance_type: {},  // 保存当前任务中已签到和未签到学员的信息
  courses: [],  // 所有的课程信息
  imgFile: {},  // 上传的图片返回的file对象，其中包含path片段地址
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
