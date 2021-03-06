import {createStore} from 'vuex'
import api from "../api";
import axios from "axios";
import router from "../router";


export default createStore({
    state: {
        item: "",
        user: {},
        token: localStorage.getItem("token"),
        message: "",
        authUser: "",
        blogs: "",
        blogDetail: "",
        Friends: "",
        FriendsRequest: "",
        FriendSent: "",
        Blocked: "",
        UsersBlogs: ""
    },
    getters: {
        getData(state) {
            return state.item
        },
        getToken(state) {
            return state.token
        },
        isAuth(state) {
            return state.token != null
        },
        getMessage(state) {
            return state.message
        },
        getAuthUser(state) {
            return state.authUser
        },
        getBlog(state) {
            return state.blogs
        },
        getBlogDetail(state) {
            return state.blogDetail
        },
        getFriend(state) {
            return state.Friends
        },
        getFriendRequest(state) {
            return state.FriendsRequest
        },
        getFriendSent(state) {
            return state.FriendSent
        },
        getBlocked(state) {
            return state.Blocked
        },
    },
    mutations: {
        setData(state, data) {
            state.item = data
        },
        setToken(state, data) {
            state.token = data
        },
        setMessage(state, data) {
            state.message = data
        },
        setAuthUser(state, data) {
            state.authUser = data
        },
        setBlogs(state, data) {
            state.blogs = data
        },
        setBlogDetail(state, data) {
            state.blogDetail = data
        },
        setFriend(state, data) {
            state.Friends = data
        },
        setFriendRequest(state, data) {
            state.FriendsRequest = data
        },
        setFriendSent(state, data) {
            state.FriendSent = data
        },
        setBlocked(state, data) {
            state.Blocked = data
        },
    },
    actions: {
        initAuth({commit, dispatch}) {
            let token = localStorage.getItem('token')
            console.log(token)
            if (token) {
                let expirationDate = localStorage.getItem("expirationDate")
                let time = new Date().getTime()
                if (time >= +expirationDate) {
                    console.log("time out")
                    dispatch("logoutUser")
                } else {
                    commit('setToken', token)
                    let timerSecond = +expirationDate - time
                    console.log(timerSecond)
                    dispatch('setTimeoutTimer', timerSecond)
                }
            } else {
                router.push("/login")
                return false
            }
        },
        getDataFromServer({commit}) {
            return new Promise((resolve) => {
                api.get('/get')
                    .then(response => {
                            commit('setData', response.data)
                            console.log(response)
                            resolve(response)
                        }
                    )
                    .catch(function (error) {
                        console.log(error.message)
                    })
            })
        },
        setDataToServer({commit}, data) {
            return new Promise((resolve, reject) => {
                api.post('/store', data)
                    .then(response => {
                            commit('setMessage', response.data)
                            console.log(response.data)
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        deleteUser({commit}, userid) {
            return new Promise((resolve, reject) => {
                // axios.post('http://127.0.0.1:8000/delete', {id: userid}, {
                //         headers: {
                //             'Authorization': `Bearer ${localStorage.getItem('token')}`
                //         }
                //     }
                // )
                //     let param = {id: userid};
                api.post('/delete', {id: userid}
                )
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        loginUser({commit, dispatch}, user) {
            return new Promise((resolve, reject) => {
                // axios.post("http://127.0.0.1:8000/login", {
                //     email: user.email,
                //     password: user.password,
                //     headers: {'Content-Type': 'application/json'},
                //     credentials: 'include'
                // })
                let param = {
                    email: user.email,
                    password: user.password,
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                }
                api.post('/login', param)
                    .then(response => {
                            console.log(response.data.access_token)
                            console.log(response)
                            commit('setToken', response.data.access_token)
                            localStorage.setItem("token", response.data.access_token)
                            localStorage.setItem("expirationDate", new Date().getTime() + 3600000)
                            api.setHeader();
                            dispatch('setTimeoutTimer', 3600000)
                            resolve(response)
                        }
                    )
                    .catch(function (error) {
                            commit('setMessage', error)
                            console.log(error)
                            reject(error)
                        }
                    )
            })
        },
        logoutUser({state}) {
            return new Promise((resolve, reject) => {
                api.get('/logout')
                    .then(response => {
                            localStorage.removeItem("token")
                            localStorage.removeItem("expirationDate")
                            state.token = null
                            console.log(localStorage.getItem('token'), state)
                            resolve(response)
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        setTimeoutTimer({dispatch}, data) {
            setTimeout(() => {
                dispatch('logoutUser')
            }, data)
        },
        getUser({commit}) {
            return new Promise((resolve, reject) => {
                // api.post('/getUser')
                axios.get('http://127.0.0.1:8000/getUser')
                    .then(response => {
                            let user = response.data[0]
                            commit("setAuthUser", user)
                            console.log(user)
                            resolve(response)
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        deleteProfilePhoto({commit}) {
            return new Promise((resolve, reject) => {
                api.get('/deleteProfilePhoto')
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        updateUser({commit}, user) {
            return new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8000/updateUser', user)
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            console.log(error)
                            reject(error)
                            return error
                        }
                    )
            })
        },
        updatePassword({commit}, password) {
            return new Promise((resolve, reject) => {
                api.post('/updatePassword', password)
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            console.log(error)
                            reject(error)
                            return error
                        }
                    )
            })
        },
        setBlog({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8000/storeBlog', data
                )
                    .then(response => {
                            console.log(response.data)
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            console.log(error)
                            reject(error)
                            return error
                        }
                    )
            })
        },
        getBlogs({commit}) {
            return new Promise((resolve, reject) => {
                api.get('/getBlogs')
                    .then(response => {
                            let blogs = response.data
                            commit("setBlogs", blogs)
                            console.log(blogs)
                            resolve(response)
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        getBlogDetails({commit}, id) {
            return new Promise((resolve, reject) => {
                api.get('/getBlog/' + id)
                    // axios.get('http://127.0.0.1:8000/getBlog/' + id, {
                    //         headers: {
                    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
                    //         }
                    //     }
                    // )
                    .then(response => {
                            let blogDetail = response.data
                            commit("setBlogDetail", blogDetail)
                            console.log(blogDetail)
                            resolve(response)
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        updateBlog({commit}, blog) {
            return new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8000/updateBlog', blog)
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            console.log(error)
                            reject(error)
                            return error
                        }
                    )
            })
        },
        deleteBlog({commit}, blogID) {
            return new Promise((resolve, reject) => {
                api.post('/deleteBlog', {id: blogID}
                )
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        favorited({commit}, blogID) {
            return new Promise((resolve, reject) => {
                api.post('/favorited', {id: blogID})
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        unfavorited({commit}, blogID) {
            return new Promise((resolve, reject) => {
                api.post('/unfavorited', {id: blogID})
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        deleteImage({commit}, imageID) {
            return new Promise((resolve, reject) => {
                api.post('/deleteImage', {id: imageID}
                )
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        getFriends({commit}) {
            return new Promise((resolve, reject) => {
                api.get('/getFriends')
                    // axios.get('http://127.0.0.1:8000/getFriends', {
                    //         headers: {
                    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
                    //         }
                    //     }
                    // )
                    .then(response => {
                            let Friends = response.data
                            commit("setFriend", Friends)
                            console.log(Friends)
                            resolve(response)
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        removeFriend({commit}, userid) {
            return new Promise((resolve, reject) => {
                api.post('/removeFriend', {id: userid})
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        getFriendRequests({commit}) {
            return new Promise((resolve, reject) => {
                api.get('/getRequest')
                    .then(response => {
                            let Friends = response.data
                            commit("setFriendRequest", Friends)
                            console.log(Friends)
                            resolve(response)
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        addFriends({commit}, userid) {
            return new Promise((resolve, reject) => {
                api.post('/acceptFriend', {id: userid})
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        sendRequest({commit}, userid) {
            return new Promise((resolve, reject) => {
                api.post('/addFriend', {id: userid})
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        getFriendsSent({commit}) {
            return new Promise((resolve, reject) => {
                api.get('/getSent')
                    .then(response => {
                            let Friends = response.data
                            commit("setFriendSent", Friends)
                            console.log(Friends)
                            resolve(response)
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        getBlockeds({commit}) {
            return new Promise((resolve, reject) => {
                api.get('/getBlocked')
                    .then(response => {
                            let Friends = response.data
                            commit("setBlocked", Friends)
                            console.log(Friends)
                            resolve(response)
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        blocked({commit}, userid) {
            return new Promise((resolve, reject) => {
                api.post('/blockFriend', {id: userid})
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        unblocked({commit}, userid) {
            return new Promise((resolve, reject) => {
                api.post('/unblockFriend', {id: userid})
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
        setComment({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8000/setComment', data)
                    .then(response => {
                            console.log(response.data)
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            console.log(error)
                            reject(error)
                            return error
                        }
                    )
            })
        },
        upComment({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8000/upComment', data)
                    .then(response => {
                            console.log(response.data)
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            console.log(error)
                            reject(error)
                            return error
                        }
                    )
            })
        },
        deleteComment({commit}, userid) {
            return new Promise((resolve, reject) => {
                api.post('/deleteComment', {id: userid})
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            reject(error)
                            return error
                        }
                    )
            })
        },
    },
    modules: {}
})
