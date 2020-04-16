import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/store";
import Cookies from 'js-cookie'

import Login from "../views/login/Login";
import Home from 'views/home/Home'
import stuBaseInfo from "../views/student/stuBaseInfo";
import stuCourse from "../views/student/stuCourse";
import stuResult from "../views/student/stuResult";
import stuAssessment from "../views/student/stuAssessment";

import TeaStusInfo from "../views/teacher/TeaStusInfo";
import TeaAllCourse from "../views/teacher/TeaAllCourse";
import TeacherInfo from "../views/teacher/TeacherInfo";
import TeaStusResult from "../views/teacher/TeaStusResult";
import TeaQueryAssessment from "../views/teacher/TeaQueryAssessment";

import AdminAllAssessment from "../views/admin/AdminAllAssessment";
import AdminAllCourse from "../views/admin/AdminAllCourse";
import AdminStusInfo from "../views/admin/AdminStusInfo";
import AdminStusResult from "../views/admin/AdminStusResult";
import AdminTeachersInfo from "../views/admin/AdminTeachersInfo";

import HomePage from "../views/home/HomePage";
import NotFound from "../components/comment/404/NotFound";

Vue.use(VueRouter)

const routes = [
  { path: '/'},
  { path: '/login', component: Login },
  { path: '/home', component: Home, children: [
    { path: '/home', redirect: 'index'},
    { path: 'index', component: HomePage},
    { path: 'stuBaseInfo', component: stuBaseInfo},
    { path: 'stuCourse', component: stuCourse},
    { path: 'stuResult', component: stuResult},
    { path: 'stuAssessment', component: stuAssessment},
    { path: 'teastusinfo', component: TeaStusInfo},
    { path: 'teaallcourse', component: TeaAllCourse},
    { path: 'teacherinfo', component: TeacherInfo},
    { path: 'teastusresult', component: TeaStusResult},
    { path: 'teaqueryassessment', component: TeaQueryAssessment},
    { path: 'adminstusinfo', component: AdminStusInfo},
    { path: 'adminteachersInfo', component: AdminTeachersInfo},
    { path: 'adminallcourse', component: AdminAllCourse},
    { path: 'adminstusresult', component: AdminStusResult},
    { path: 'adminallassessment', component: AdminAllAssessment},
  ]},
  { path: '*', component: NotFound}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
/**
 * 实现自动登录效果
 * 1.先判断 cookie 中是否存在 userId
 *    1) 不存在 userId：重定向到 /login 页面
 *    2) 存在 userId：判断 vuex 中是否存在 userId
 * 2.如果 vuex 中没有，则发送请求，且暂时状态不变，如果有则看请求路径是否合法，不合法则跳转到404页面
 */
router.beforeEach(async (to, from, next) => {
  let cookieId = Cookies.get('userid')
  let {userid} = store.state.userInfo
  let path = window.sessionStorage.getItem('path')
  if (to.path === '/login') {
    return next()
  }
  if (!cookieId) {
    return next('/login')
  }
  if (!userid) {
    await store.dispatch('getStatus')
    if (path) return next(path)
    return next('/home/index')
  }
  next()
})

export default router
