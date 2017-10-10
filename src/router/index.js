import Vue from 'vue'
import Router from 'vue-router'
//noinspection JSUnresolvedVariable
import Login from '../components/page/Login.vue'
//noinspection JSUnresolvedVariable
import Home from '../components/page/Home.vue'
//noinspection JSUnresolvedVariable
import BaseForm from '../components/page/BaseForm.vue'
//noinspection JSUnresolvedVariable
import HomePageBanner from '../components/page/HomePageHeadBanner.vue'
//noinspection JSUnresolvedVariable
import Home2 from '../components/page/Home2.vue'
import HomeHot from '../components/page/HomeHot.vue'

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
        },{
          path: '/HomePageBanner',
          component:HomePageBanner,
          name: 'HomePageBanner'
        },{
          path: '/Home2',
          component:Home2,
          name: 'Home2'
        },{
          path: '/HomeHot',
          component: HomeHot,
          name: 'HomeHot'
        }
      ]
    }
  ]
})
