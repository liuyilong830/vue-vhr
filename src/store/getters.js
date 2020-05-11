export default {
  getUserInfo(state) {
    return state.userInfo
  },
  getUsers(state) {
    return state.users
  },
  getWeather(state) {
    return state.weather
  },
  getSelfInfo(state) {
    return state.self
  },
  getTasks(state) {
    return state.tasks
  },
  getTaskStatus(state) {
    return state.taskStatus
  },
  getAttendanceType(state) {
    return state.attendance_type
  },
  getAllCourse(state) {
    return state.courses
  },
  getImgPath(state) {
    return state.imgFile;
  },
  getGrades(state) {
    return state.grades
  }
}