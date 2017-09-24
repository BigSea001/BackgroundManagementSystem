import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/page/Login.vue'
import Home from '../components/page/Home.vue'
import BaseForm from '../components/page/BaseForm.vue'

Vue.use(Router);

export default new Router({
  // mode: 'history',  // 如果要使用历史记录就放开
  routes: [
    {
      path: '/',
      redirect: '/Login'    // 重定向
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/BaseFrom',
          component: BaseForm,
          name: 'BaseFrom'
        }
      ]
    }
  ]
})
