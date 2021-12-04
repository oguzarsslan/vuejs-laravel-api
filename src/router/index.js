import {createRouter, createWebHistory} from 'vue-router'
import Auth from "../components/auth/Auth";
import Users from "../components/users/Users"
import Profile from "../components/profile/Profile";
import Index from "../components/index/Index"
import Blogs from "../components/blogs/Blogs";
import BlogDetail from "../components/blogs/BlogDetail";
import Friends from "../components/profile/Friends";

const routes = [
    // {
    //     path: '/',
    //     name: 'Home',
    // beforeEnter(to, from, next) {
    //   if (!localStorage.getItem('token')) {
    //     next('/login')
    //   } else {
    //     next()
    //   }
    // }
    // },
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '/login',
        name: 'Auth',
        component: Auth,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next('/')
            } else {
                next()
            }
        }
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
    },
    {
        path: '/blogs',
        name: 'Blogs',
        component: Blogs,
        beforeEnter(to, from, next) {
            if (!localStorage.getItem('token')) {
                next('/login')
            } else {
                next()
            }
        }
    },
    {
        path: '/blog/:id',
        name: 'BlogDetail',
        component: BlogDetail,
        // beforeEnter(to, from, next) {
        //     if (!localStorage.getItem('token')) {
        //         next('/login')
        //     } else {
        //         next()
        //     }
        // }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    },
    {
        path: '/friends',
        name: 'Friends',
        component: Friends,
        beforeEnter(to, from, next) {
            if (!localStorage.getItem('token')) {
                next('/')
            } else {
                next()
            }
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
