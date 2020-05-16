import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Group from '../views/Group.vue'
import Project from '../views/Project.vue'
import Interface from '../components/project/interface.vue'
import ProjectDetail from '../components/project/project.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/group',
    name: 'Group',
    component: Group
  },
  {
    path: '/project/:pid',
    name: 'Project',
    component: Project,
    children: [
      {
        path: '',
        component: ProjectDetail
      },
      {
        path: 'interface',
        component: Interface
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') return next()
  // 其他校验
  const uid = window.sessionStorage.getItem('uid')
  if (!uid) return next('/login')
  return next()
})

export default router
