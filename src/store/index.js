import {createStore} from 'vuex'
import api from "../api";
import axios from "axios";

export default createStore({
    state: {
        item: "",
        user: {},
        token: ""
    },
    getters: {
        getData(state) {
            return state.item;
        },
        getToken(state) {
            return state.token;
        },
        isAuth(state) {
            return state.token !== ""
        }
    },
    mutations: {
        setData(state, data) {
            state.item = data;
        },
        setToken(state, data) {
            state.token = data.data.access_token;
        },
        clearToken(state) {
            state.token = ""
        },
    },
    actions: {
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
                            commit('setToken', response)
                            console.log(response.data)
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                        reject(error)
                        return error
                    })
            })
        },
        deleteUser({commit}, userid) {
            return new Promise((resolve, reject) => {
                // axios.post('http://127.0.0.1:8000/delete', {id: userid},
                // )
                let param = {id: userid};
                api.post('/delete', param)
                    .then(response => {
                            resolve(response)
                            return response
                        }
                    )
                    .catch(function (error) {
                        reject(error)
                        return error
                    })
            })
        },
        loginUser({commit}, user) {
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
                        commit('setToken', response)
                        localStorage.setItem("token", response.data.access_token)
                        api.init();
                        resolve(response)
                        return response
                    })
            })
        },
        logout({commit}) {
            return new Promise(() => {
                commit("clearToken")
                localStorage.removeItem("token")
            })
        }
    },
    modules: {}
})
