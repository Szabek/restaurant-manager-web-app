import axios from "axios";
import {login, logout} from "@/api/adminAuth";
export const namespaced = true

export const state = {
    user: null
}

export const mutations = {
    SET_USER_DATA(state, userData) {
        state.user = userData
        localStorage.setItem('user', JSON.stringify(userData))
        axios.defaults.headers.common['Authorization'] = `Bearer ${
            userData.token
        }`
    },
    CLEAR_USER_DATA() {
        localStorage.removeItem('user')
        location.reload()
    }
}

export const actions = {
    async login({commit}, credentials) {
        return login(credentials)
            .then(({data}) => {
                commit('SET_USER_DATA', data)
            })
    },
    async logout({commit}) {
        return logout()
            .then(commit('CLEAR_USER_DATA'))
    },
    clearUserData({commit}) {
        commit('CLEAR_USER_DATA')
    }
}

export const getters = {
    loggedIn(state) {
        return !!state.user
    }
}


