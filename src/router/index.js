import Vue from 'vue'
import Router from 'vue-router'
import Message from 'components/message/message'
import Contact from 'components/contact/contact'
import News from 'components/news/news'
import Dynamic from 'components/dynamic/dynamic'
import Login from 'components/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/message',
      component: Message
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/news',
      component: News
    },
    {
      path: '/dynamic',
      component: Dynamic
    }
  ]
})
