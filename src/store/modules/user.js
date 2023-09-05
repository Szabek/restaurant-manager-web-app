import * as userApi from "@/api/users";

export const namespaced = true

export const state = {
    users: [],
    currentUser: {}
}

export const mutations = {
    ADD_USER(state, user) {
        state.users.unshift(user)
    },
    SET_CURRENT_USER(state, user) {
        state.currentUser = user
    },
    SET_USERS(state, users) {
        state.users = users
    },
    UPDATE_USER(state, newUser) {
        const user = state.users.find(oldUser => oldUser.id === newUser.id)
        user.email = newUser.email
        user.firstname = newUser.firstname
        user.lastname = newUser.lastname
        user.role = newUser.role
        user.tables = newUser.tables
    },
    UPDATE_CURRENT_USER(state, newUser) {
        state.currentUser.email = newUser.email
        state.currentUser.firstname = newUser.firstname
        state.currentUser.lastname = newUser.lastname
        state.currentUser.role = newUser.role
        state.currentUser.tables = newUser.tables
    },
    DELETE_USER(state, id) {
        const index = state.users.findIndex(user => user.id === id)
        state.users.splice(index, 1)
    }
}

export const actions = {
    createUser({commit}, user) {
        return userApi.postUser(user)
            .then(response => {
                commit('ADD_USER', response.data)
            })
    },
    fetchCurrentUser({commit}) {
        return userApi.getCurrentUser()
            .then(response => {
                commit('SET_CURRENT_USER', response.data)
            })
    },
    fetchUsers({commit}) {
        return userApi.getUsers()
            .then(response => {
                commit('SET_USERS', response.data)
            })
    },
    updateUser({commit}, updatedUser) {
        return userApi.updateUser(updatedUser.id, updatedUser)
            .then(response => {
                commit('UPDATE_USER', response.data)
            })
    },
    updateUserTables({commit}, updatedUser) {
        return userApi.updateUserTables(updatedUser.id, updatedUser)
            .then(response => {
                commit('UPDATE_CURRENT_USER', response.data)
            })
    },
    deleteUser({commit}, userId) {
        return userApi.deleteUser(userId)
            .then(response => {
                if (response.data === true) {
                    commit('DELETE_USER', userId)
                }
            })
    }
}
