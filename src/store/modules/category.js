import * as categoryApi from "@/api/categories";

export const namespaced = true

export const state = {
    categories: []
}

export const mutations = {
    ADD_CATEGORY(state, category) {
        state.categories.unshift(category)
    },
    SET_CATEGORIES(state, categories) {
        state.categories = categories
    },
    UPDATE_CATEGORY(state, newCategory) {
        const category = state.categories.find(oldCategory => oldCategory.id === newCategory.id)
        category.name = newCategory.name
    },
    DELETE_CATEGORY(state, id) {
        const index = state.categories.findIndex(category => category.id === id)
        state.categories.splice(index, 1)
    }
}

export const actions = {
    createCategory({commit}, category) {
        return categoryApi.postCategory(category)
            .then(response => {
                commit('ADD_CATEGORY', response.data)
            })
    },
    fetchCategories({commit}) {
        return categoryApi.getCategories()
            .then(response => {
                commit('SET_CATEGORIES', response.data)
            })
    },
    updateCategory({commit}, updatedCategory) {
        return categoryApi.updateCategory(updatedCategory.id, updatedCategory)
            .then(response => {
                commit('UPDATE_CATEGORY', response.data)
            })
    },
    deleteCategory({commit}, categoryId) {
        return categoryApi.deleteCategory(categoryId)
            .then(response => {
                if (response.data === true) {
                    commit('DELETE_CATEGORY', categoryId)
                }
            })
    }
}
