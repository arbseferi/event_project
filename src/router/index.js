import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '/about',
        name: 'About',
        component: () => import('../components/About.vue')
      },
      {
        path: '/events',
        name: 'Events',
        component: () => import('../components/Events.vue')
      },
      {
        path: '/addevent',
        name: 'Add Event',
        component: () => import('../components/AddEvent.vue')
      },
      {
        path: '/editevent/:id',
        name: 'Edit Event',
        props: true,
        component: () => import('../components/EditEvent.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*', redirect: '/'
  },
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    if(to.name === 'Login'){
      next()
    }else {
      if(localStorage.session !== undefined){
        next()
      } else {
        next({ name: 'Login' })
      }
    }
})
export default router
