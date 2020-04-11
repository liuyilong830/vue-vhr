/**
 * 该文件保存所有的请求的方法
 */
import ajax from "./ajax";
import {loginPath} from './req-path/loginView'

/* loginView */
// 该请求要求传入一个对象，里面包含登录所需要的所有键值对
export const reqLogin = (loginInfo) => ajax(loginPath.login, loginInfo, 'post')
