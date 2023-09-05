import * as ingredientApi from "@/api/ingredients";

export const namespaced = true

export const state = {
    ingredients: []
}

export const mutations = {
    ADD_INGREDIENT(state, ingredient) {
        state.ingredients.unshift(ingredient)
    },
    SET_INGREDIENTS(state, ingredients) {
        state.ingredients = ingredients
    },
    UPDATE_INGREDIENT(state, newIngredient) {
        const ingredient = state.ingredients.find(oldIngredient => oldIngredient.id === newIngredient.id)
        ingredient.name = newIngredient.name
        ingredient.unit = newIngredient.unit
    },
    DELETE_INGREDIENT(state, id) {
        const index = state.ingredients.findIndex(ingredient => ingredient.id === id)
        state.ingredients.splice(index, 1)
    }
}

export const actions = {
    createIngredient({commit}, ingredient) {
        return ingredientApi.postIngredient(ingredient)
            .then(response => {
                commit('ADD_INGREDIENT', response.data)
            })
    },
    fetchIngredients({commit}) {
        return ingredientApi.getIngredients()
            .then(response => {
                commit('SET_INGREDIENTS', response.data)
            })
    },
    updateIngredient({commit}, updatedIngredient) {
        return ingredientApi.updateIngredient(updatedIngredient.id, updatedIngredient)
            .then(response => {
                commit('UPDATE_INGREDIENT', response.data)
            })
    },
    deleteIngredient({commit}, IngredientId) {
        return ingredientApi.deleteIngredient(IngredientId)
            .then(response => {
                if (response.data === true) {
                    commit('DELETE_INGREDIENT', IngredientId)
                }
            })
    }
}
