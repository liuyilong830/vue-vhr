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
// 获取当前的天气信息
export const reqWeather = () => axios({
  url: 'https://tianqiapi.com/free/day',
  params: {appid: 11997696, appsecret: 'PT7ucDD9'}
})
