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
  UPLOADIMG,
  GETGRADES
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
  reqStuBySname,
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
  reqUploadImg,
  reqDeleteImg,
  reqDeleteCourse,
  reqGetGrades,
  reqUpdateGrade,
  reqDeleteGrade,
  reqInsertGrade,
  reqGetGradeByUserid
} from 'api/index.js'
export default {
  // 登录获取用户信息
  async reqUserInfo({ commit }, payload) {
    let result = await reqLogin(payload)
    if (result) {
      commit( SETUSERINFO, result.data.items[0])
    }
  },
  // 刷新页面获取登录状态
  async getStatus({ commit }) {
    let result = await reqStatus()
    if (result.data) {
      commit( SETUSERINFO, result.data.items[0])
    }
  },
  // 新增一名学员
  async reqInsertStu({ commit }, user) {
    return await reqInsertStu(user)
  },
  // 查询所有学生的基本信息
  async reqStudents({ commit }) {
    let result = await reqStudents()
    if (result.data) {
      commit( SETSTUDENTS, result.data.items)
    }
  },
  // 根据userid查询某一个学员的基本信息
  async reqStuById({ commit }, userid) {
    let result = await reqStuById(userid)
    if (result.data) {
      commit( GETSELFINFO, result.data.items)
    }
  },
  // 根据sname查询一名学员的基本信息
  async reqStuBySname ({ commit }, sname) {
    return await reqStuBySname(sname)
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
  // 根据userid查询某一个教师的信息
  async reqTeaById({commit}, userid) {
    let result = await reqTeaById(userid)
    if (result.data) {
      commit(GETSELFINFO, result.data.items)
    }
  },
  // 更新一名教师的信息
  async reqUpdateTea(context, user) {
    return await reqUpdateTea(user)
  },
  // 新增一名教师
  async reqInsertTea({ commit }, user) {
    return await reqInsertTea(user)
  },
  // 删除一名教师
  async reqDeleteTea(context, userid) {
    return await reqDeleteTea(userid)
  },
  // 根据指定的时间戳，查询当前日期开始的所有发布了的考勤任务，其中不含有辅导员发送的，因为辅导员没有对应的表，进行不了一些处理
  async reqGetTaskByTime({ commit }, time) {
    let result = await reqGetTaskByTime(time)
    if (result.data) {
      commit(GETTASKS, result.data.items)
    }
  },
  // 根据userid和time查询某学生指定日期的签到情况
  async reqTaskStatusById({ commit }, payload) {
    let result = await reqTaskStatusById(payload.userid, payload.time)
    if (result.data) {
      commit(TASKSTATUS, result.data.items)
    }
  },
  // 新增一条签到信息（学生签到的请求）
  async reqInsertAtd(context, payload) {
    return await reqInsertAtd(payload)
  },
  // 发布一条新的考勤任务，（辅导员和教师都可以发起）
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
  // 获取所有的课程信息
  async reqGetCourse({ commit }) {
    let result = await reqGetCourse()
    if (result.data) {
      commit(ALLCOURSE, result.data.items)
    }
  },
  // 更新某一门课程的信息
  async reqUpdateCourse(context, course) {
    return await reqUpdateCourse(course)
  },
  // 新增一门课程
  async reqInsertCourse(context, course) {
    return await reqInsertCourse(course)
  },
  // 上传图片的请求，用于新增课程使用
  async reqUploadImg({ commit }, file) {
    let param = new FormData()
    param.append('file', file)
    let result = await reqUploadImg(param)
    if (result.data) {
      commit(UPLOADIMG, result.data.items[0])
    }
  },
  // 删除图片的请求，用于设置了图片但是取消了新增课程的时候
  async reqDeleteImg(context, filename) {
    return await reqDeleteImg(filename)
  },
  // 删除某一门课程，（后台需要根据payload中的参数删除指定的图片）
  async reqDeleteCourse(context, payload) {
    return await reqDeleteCourse(payload)
  },
  // 获取所有的成绩
  async reqGetGrades({ commit }) {
    let result = await reqGetGrades()
    if (result.data) {
      commit(GETGRADES, result.data.items)
    }
  },
  // 更新某一门成绩信息
  async reqUpdateGrade(context, grade) {
    return await reqUpdateGrade(grade)
  },
  // 删除所有的成绩
  async reqDeleteGrade() {
    return await reqDeleteGrade()
  },
  // 新增一门成绩
  async reqInsertGrade(context, grade) {
    return await reqInsertGrade(grade)
  },
  // 根据userid获取某一名学员的信息
  async reqGetGradeByUserid({ commit }, userid) {
    let result = await reqGetGradeByUserid(userid)
    commit(GETGRADES, result.data.items)
  }
}