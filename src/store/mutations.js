/**
 * 该文件存放了所有关于 vuex 中的同步方法
 */
import {CLOSETPATH} from './mutation-types'
export default {
  setUserInfo(state, payload) {
    state.userInfo = {...payload}
  }
}