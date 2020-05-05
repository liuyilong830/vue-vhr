/**
 * 该文件存放所有的 vuex 中的异步请求方法
 */
import {
  SETUSERINFO,
  SETSTUDENTS,
  SETWEATHER,
  GETSELFINFO,
  GETTASKS,
  TASKSTATUS,
  COMPLETION,
  ALLCOURSE,
  UPLOADIMG
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
  reqDeleteTea,
  reqGetTaskByTime,
  reqTaskStatusById,
  reqInsertAtd,
  reqInsertTask,
  reqGetCompletion,
  reqGetCourse,
  reqInsertCourse,
  reqUpdateCourse,
  reqUploadImg
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
  },
  async reqGetTaskByTime({ commit }, time) {
    let result = await reqGetTaskByTime(time)
    if (result.data) {
      commit(GETTASKS, result.data.items)
    }
  },
  async reqTaskStatusById({ commit }, payload) {
    let result = await reqTaskStatusById(payload.userid, payload.time)
    if (result.data) {
      commit(TASKSTATUS, result.data.items)
    }
  },
  async reqInsertAtd(context, payload) {
    return await reqInsertAtd(payload)
  },
  async reqInsertTask(context, task) {
    return await reqInsertTask(task)
  },
  // 根据 id 查询该考勤任务已签到和未签到学员名单
  async reqGetCompletion({ commit }, id) {
    let result = await reqGetCompletion(id)
    if (result.data) {
      commit(COMPLETION, result.data)
    }
  },
  async reqGetCourse({ commit }) {
    let result = await reqGetCourse()
    if (result.data) {
      commit(ALLCOURSE, result.data.items)
    }
  },
  async reqUpdateCourse(context, course) {
    return await reqUpdateCourse(course)
  },
  async reqInsertCourse(context, course) {
    return await reqInsertCourse(course)
  },
  async reqUploadImg({ commit }, file) {
    let param = new FormData()
    param.append('file', file)
    let result = await reqUploadImg(param)
    if (result.data) {
      commit(UPLOADIMG, result.data.items[0])
    }
  }
}