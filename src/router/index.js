import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue';
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';


const requireAuth = (to, from, next) =>{
  const unsubscribe = onAuthStateChanged(auth, (user) =>{
    unsubscribe()
    if (user) {
      next()
    }else{
      next('/auth')
    }
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
      beforeEnter: requireAuth
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/transactions',
      name: 'Transactions',
      component: () => import('../views/AddTransactionView.vue'),
      beforeEnter: requireAuth
    }
  ]
})

export default router
