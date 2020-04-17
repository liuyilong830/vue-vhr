/**
 * 该文件存放了所有关于 vuex 中的同步方法
 */
import {SETUSERINFO, SETSTUDENTS, SETWEATHER} from './mutation-types'
export default {
  [SETUSERINFO](state, payload) {
    state.userInfo = {...payload}
  },
  [SETSTUDENTS](state, students) {
    state.students = students
  },
  [SETWEATHER](state, weather) {
    state.weather = weather
  }
}