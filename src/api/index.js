/**
 * 该文件保存所有的请求的方法
 */
import ajax from "./ajax";
import axios from 'axios'

/* loginView */
// 该请求要求传入一个对象，里面包含登录所需要的所有键值对
export const reqLogin = (loginInfo) => ajax('/login', loginInfo, 'post')
// 获取用户的状态（用户查看是否登录）
export const reqStatus = () => ajax('/user')
// 新增学员信息
export const reqInsertStu = (user) => ajax('/insertStu', user, 'post')
// 获取所有学员的信息
export const reqStudents = () => ajax('/stusInfo')
// 根据userid获取指定学员的信息
export const reqStuById = (userid) => ajax('/stuById', {userid})
// 获取当前的天气信息
export const reqWeather = () => axios({
  url: 'https://tianqiapi.com/free/day',
  params: {appid: 11997696, appsecret: 'PT7ucDD9'}
})
// 更新某一个学生的信息
export const reqUpdateStu = (user) => ajax('/updateStu', user, 'post')
// 删除某一个学生
export const reqDeleteStu = (userid) => ajax('/deleteStu', {userid}, 'post')
// 获取所有教师的信息
export const reqGetTeas = () => ajax('/teasInfo')
// 根据userid获取指定教师的信息
export const reqTeaById = (userid) => ajax('/teaById', {userid})
// 更新某一个学生的信息
export const reqUpdateTea = (user) => ajax('/updateTea', user, 'post')
// 新增一名老师
export const reqInsertTea = (user) => ajax('/insertTea', user, 'post')
// 删除一名教师
export const reqDeleteTea = (userid) => ajax('/deleteTea', {userid}, 'post')
// 根据 time 时间戳来获取指定日期的任务
export const reqGetTaskByTime = (time) => ajax('/getTask', {time})
// 根据 userid 和 time 查询指定学生在某一日的签到情况
export const reqTaskStatusById = (userid, time) => ajax('/getTaskById', {userid, time})
// 根据 taskid userid day 字段添加一条签到信息
export const reqInsertAtd = ({taskid, userid}) => ajax('/insertAtd', {taskid, userid}, 'post')
// 根据 attendance_time 表中所有数据，发布一条新的考勤任务
export const reqInsertTask = (task) => ajax('/insertTask', task, 'post')
// 根据 id 获取该任务中已签到和未签到的学员名单
export const reqGetCompletion = (id) => ajax('/getCompletion', {id})
// 获取所有课程信息
export const reqGetCourse = () => ajax('/cousInfo')
// 更新某一个课程信息
export const reqUpdateCourse = (course) => ajax('/updateCou', course, 'post')
// 新增一门课程信息
export const reqInsertCourse = (course) => ajax('/insertCou', course, 'post')
// 上传图片并返回path
export const reqUploadImg = (file) => ajax('/upload', file, 'post')
// 删除上传的图片
export const reqDeleteImg = (filename) => ajax('/deleteImg', {filename}, 'post')
// 删除某一个课程
export const reqDeleteCourse = ({id,img}) => ajax('/deleteCou', {id,img}, 'post')
