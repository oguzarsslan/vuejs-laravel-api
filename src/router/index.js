import {createRouter, createWebHistory} from 'vue-router'
import Auth from "../components/auth/Auth";
import Users from "../components/users/Users"

const routes = [
    {
        path: '/',
        name: 'Home',
        // beforeEnter(to, from, next) {
        //   if (!localStorage.getItem('token')) {
        //     next('/login')
        //   } else {
        //     next()
        //   }
        // }
    },
    {
        path: '/login',
        name: 'Auth',
        component: Auth,
        // beforeEnter(to, from, next) {
        //   if (!localStorage.getItem('token')) {
        //     next()
        //   } else {
        //     next('/about')
        //   }
        // }
    },
    {
        path: '/users',
        name: 'Users',
        component: Users,
        beforeEnter(to, from, next) {
          if (!localStorage.getItem('token')) {
            next('/login')
          } else {
            next()
          }
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
