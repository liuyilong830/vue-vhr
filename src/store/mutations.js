/**
 * 该文件存放了所有关于 vuex 中的同步方法
 */
import {
  SETUSERINFO,
  SETSTUDENTS,
  SETWEATHER,
  GETSELFINFO,
  SIGNOUT,
  GETTASKS,
  TASKSTATUS,
  PUSHTASK,
  COMPLETION,
  ALLCOURSE, UPLOADIMG
} from './mutation-types'
export default {
  [SETUSERINFO](state, payload) {
    state.userInfo = {...payload}
  },
  [SETSTUDENTS](state, users) {
    state.users = users
  },
  [SETWEATHER](state, weather) {
    state.weather = weather
  },
  [GETSELFINFO](state, self) {
    state.self = self
  },
  [SIGNOUT](state) {
    state.userInfo = {}
    state.users = []
    state.weather = {}
    state.self = []
  },
  [GETTASKS](state, tasks) {
    state.tasks = tasks
  },
  [TASKSTATUS](state, taskStatus) {
    state.taskStatus = taskStatus
  },
  [PUSHTASK](state, task) {
    state.tasks.push(task)
  },
  [COMPLETION](state, payload) {
    state.attendance_type = payload
  },
  [ALLCOURSE](state, courses) {
    state.courses = courses
  },
  [UPLOADIMG](state, payload) {
    state.imgFile = payload.file
  }
}