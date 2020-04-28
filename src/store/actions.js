/**
 * 该文件存放所有的 vuex 中的异步请求方法
 */
import {
  SETUSERINFO,
  SETSTUDENTS,
  SETWEATHER,
  GETSELFINFO
} from './mutation-types'
import {
  reqLogin,
  reqStatus,
  reqInsertStu,
  reqStudents,
  reqWeather,
  reqUpdateStu,
  reqDeleteStu,
  reqStuById,
  reqGetTeas,
  reqTeaById,
  reqUpdateTea,
  reqInsertTea,
  reqDeleteTea
} from 'api/index.js'
export default {
  async reqUserInfo({ commit }, payload) {
    let result = await reqLogin(payload)
    if (result) {
      commit( SETUSERINFO, result.user)
    }
  },
  async getStatus({ commit }) {
    let result = await reqStatus()
    if (result) {
      commit( SETUSERINFO, result.user)
    }
  },
  async reqInsertStu({ commit }, user) {
    return await reqInsertStu(user)
  },
  async reqStudents({ commit }) {
    let result = await reqStudents()
    if (result) {
      commit( SETSTUDENTS, result.users)
    }
  },
  async reqStuById({ commit }, userid) {
    let result = await reqStuById(userid)
    if (result.data) {
      commit( GETSELFINFO, result.data.items)
    }
  },
  // 获取天气的api
  async reqWeather({commit}) {
    let result = await reqWeather()
    if (result) {
      commit( SETWEATHER, result.data )
    }
  },
  // 更新学生信息
  async reqUpdateStu({ commit }, user) {
    return await reqUpdateStu(user)
  },
  // 删除学生信息
  async reqDeleteStu({ commit }, userid) {
    return await reqDeleteStu(userid)
  },
  // 获取所有教师的信息
  async reqGetTeas({ commit }) {
    let result = await reqGetTeas()
    if (result.data) {
      commit(SETSTUDENTS, result.data.items)
    }
  },
  async reqTeaById({commit}, userid) {
    let result = await reqTeaById(userid)
    if (result.data) {
      commit(GETSELFINFO, result.data.items)
    }
  },
  async reqUpdateTea(context, user) {
    return await reqUpdateTea(user)
  },
  async reqInsertTea({ commit }, user) {
    return await reqInsertTea(user)
  },
  async reqDeleteTea(context, userid) {
    return await reqDeleteTea(userid)
  }
}