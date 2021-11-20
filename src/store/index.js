import {createStore} from 'vuex'
import api from "../api";
import axios from "axios";
import router from "../router";

export default createStore({
    state: {
        item: "",
        user: {},
        token: "",
        message: ""
    },
    getters: {
        getData(state) {
            return state.item
        },
        getToken(state) {
            return state.token
        },
        isAuth(state) {
            return state.token !== ""
        },
        getMessage(state) {
            return state.message
        }
    },
    mutations: {
        setData(state, data) {
            state.item = data
        },
        setToken(state, data) {
            state.token = data
        },
        // clearToken(state) {
        //     state.token = ""
        // },
        setMessage(state, data) {
            state.message = data
        }
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
            return new Promise((resolve, reject) => {
                // api.get('/get')
                //     .then(response => {
                //             commit('setData', response)
                //             resolve(response)
                //         }
                //     )
                //     .catch(function (error) {
                //         console.log(error.message)
                //     })
                axios.get('http://127.0.0.1:8000/get', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(response => {
                            commit('setData', response)
                            resolve(response)
                        }
                    )
                    .catch(function (error) {
                        console.log(error)
                    })
            })
        },
        setDataToServer({commit}, data) {
            return new Promise((resolve, reject) => {
                // axios.post('http://127.0.0.1:8000/store', data)
                api.post('/store', data)
                    .then(response => {
                            commit('setMessage', response.data)
                            console.log(response.data)
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            // commit('setMessage', error.data.error)
                            // console.log(error.data)
                            reject(error)
                            return error
                        }
                    )
            })
        },
        deleteUser({commit}, userid) {
            return new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8000/delete', {id: userid}, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                    // let param = {id: userid};
                    // api.post('/delete', {
                    //         headers: {
                    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
                    //         },
                    //         param
                    //     }
                    // )
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
                            commit('setToken', response.data.access_token)
                            localStorage.setItem("token", response.data.access_token)
                            localStorage.setItem("expirationDate", new Date().getTime() + 5000)
                            api.init();
                            dispatch('setTimeoutTimer', 5000)
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                            commit('setMessage', error)
                            console.log(error)
                            reject(error)
                            return error
                        }
                    )
            })
        },
        logoutUser({commit}) {
            return new Promise((resolve, reject) => {
                // api.post('/logout')
                axios.get('http://127.0.0.1:8000/logout', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                    .then(response => {
                            // commit("clearToken")
                            localStorage.removeItem("token")
                            localStorage.removeItem("expirationDate")
                            resolve(response)
                            console.log(localStorage.getItem('token'))
                            router.replace("/login")
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
        setTimeoutTimer({dispatch}, data) {
            setTimeout(() => {
                dispatch('logoutUser')
            }, data)
        }
    },
    modules: {}
})
