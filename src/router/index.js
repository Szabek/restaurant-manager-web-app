/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
const TheContainer = () => import('@/containers/manager/TheContainer.vue')
const Dashboard = () => import('@/views/manager/Dashboard.vue')


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue')
    },
    {
      path: '/restore_password',
      name: 'restore_password',
      component: () => import('@/views/auth/RestorePassword.vue')
    },
    {
      path: '/page404',
      name: 'Page404',
      component: () => import('@/views/codeStatusPages/Page404')
    },
    {
      path: '/page500',
      name: 'Page500',
      component: () => import('@/views/codeStatusPages/Page500')
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      meta: { requiresAuth: ['ADMIN', 'MANAGER']},
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/units',
          name: 'Units',
          component: () => import('@/views/manager/Units.vue')
        },
        {
          path: '/ingredients',
          name: 'Ingredients',
          component: () => import('@/views/manager/Ingredients.vue')
        },
        {
          path: '/categories',
          name: 'Categories',
          component: () => import('@/views/manager/Categories.vue')
        },
        {
          path: '/tables',
          name: 'Tables',
          component: () => import('@/views/manager/Tables.vue')
        },
        {
          path: '/users',
          name: 'Users',
          component: () => import('@/views/manager/Users.vue')
        },
        {
          path: '/dishes',
          name: 'Dishes',
          component: () => import('@/views/manager/Dishes.vue')
        },
        {
          path: '/dishes/:id/edit',
          name: 'Dishes-edit',
          component: () => import('@/views/manager/DishesEdit.vue'),
          props: true
        },
        {
          path: '/help',
          name: 'Help',
          component: () => import('@/views/manager/Help.vue'),
          props: true
        },
        {
          path: '/contact',
          name: 'Contact',
          component: () => import('@/views/manager/Contact.vue'),
          props: true
        },
        {
          path: '/statistics/reports',
          name: 'Reports',
          component: () => import('@/views/manager/Reports.vue'),
        },
        {
          path: '/statistics/orders-charts',
          name: 'OrdersStatistics',
          component: () => import('@/views/manager/OrdersStatistics.vue'),
        },
        {
          path: '/statistics/waiters-charts',
          name: 'WaitersStatistics',
          component: () => import('@/views/manager/WaitersStatistics.vue'),
        },
        {
          path: '/statistics/dishes-charts',
          name: 'DishesStatistics',
          component: () => import('@/views/manager/DishesStatistics.vue'),
        },
        {
          path: '/statistics/ingredients-charts',
          name: 'IngredientsStatistics',
          component: () => import('@/views/manager/IngredientsStatistics.vue'),
        },
        {
          path: '/statistics/traffic-charts',
          name: 'TrafficStatistics',
          component: () => import('@/views/manager/TrafficStatistics.vue'),
        }
      ]
    },
    {
      path: '/waiter',
      redirect: '/waiter/tables',
      name: 'Waiter',
      component: () => import('@/containers/waiter/WaiterContainer.vue'),
      meta: { requiresAuth: ['WAITER']},
      children: [
        {
          path: '/waiter/tables',
          name: 'TablesWaiter',
          component: () => import('@/views/waiter/Tables.vue')
        },
        {
          path: '/waiter/tables/edit',
          name: 'TablesWaiterEdit',
          component: () => import('@/views/waiter/TablesEdit.vue')
        },
        {
          path: '/waiter/order/:id',
          name: 'Order-edit',
          component: () => import('@/views/waiter/Orders.vue'),
          props: true
        },
      ]
    },
    {
      path: '/cook',
      redirect: '/cook/orders',
      name: 'Cook',
      component: () => import('@/containers/cook/CookContainer.vue'),
      meta: { requiresAuth: ['COOK']},
      children: [
        {
          path: '/cook/orders',
          name: 'CookOrders',
          component: () => import('@/views/cook/Orders.vue')
        }
      ]
    },
  ]
}
router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem('user'))

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiredRoles = requiresAuth ? to.matched.find(record => record.meta.requiresAuth).meta.requiresAuth : []

  const isValidRoute = to.matched.length > 0

  if (!isValidRoute) {
    next({ name: 'Page404'})
  } else if (requiresAuth) {
    if (!userData) {
      next('/login')
    } else {
      const userRole = userData.role

      if (requiredRoles.includes(userRole)) {
        next()
      } else {
        store.dispatch('auth/clearUserData')
        next('/login')
      }
    }
  } else {
    next()
  }
})

export default router