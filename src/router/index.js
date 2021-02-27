import { createRouter, createWebHistory } from 'vue-router'
import Teams from '../views/Teams.vue'
import Championships from '../views/Championships'

const routes = [
  {
    path: '/',
    name: 'Teams',
    component: Teams
  },
  {
    path: '/championships',
    name: 'Championships',
    component: Championships
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
