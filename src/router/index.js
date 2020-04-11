import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../views/login/Login";
import Home from 'views/home/Home'
import BaseInfo from "../views/home/child/BaseInfo";
import SeniorInfo from "../views/home/child/SeniorInfo";
import TeaRewPunish from "../views/teacher/TeaRewPunish";
import TeaTrain from "../views/teacher/TeaTrain";
import TeaTransfer from "../views/teacher/TeaTransfer";
import HomePage from "../views/home/HomePage";

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login'},
  { path: '/login', component: Login },
  { path: '/home', component: Home, children: [
    { path: '/home', redirect: 'index'},
    { path: 'index', component: HomePage},
    { path: 'stuBaseInfo', component: BaseInfo},
    { path: 'stuSeniorInfo', component: SeniorInfo},
    { path: 'teaRewPunish', component: TeaRewPunish},
    { path: 'teaTrain', component: TeaTrain},
    { path: 'teaTransfer', component: TeaTransfer}
  ]}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
