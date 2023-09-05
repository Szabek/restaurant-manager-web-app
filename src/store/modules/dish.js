import * as dishApi from "@/api/dishes";

export const namespaced = true

export const state = {
    dishes: [],
    dishToEdit: {}
}

export const mutations = {
    ADD_DISH(state, dish) {
        state.dishes.unshift(dish)
    },
    SET_DISHES(state, dishes) {
        state.dishes = dishes
    },
    SET_DISH_TO_EDIT(state, dish) {
        state.dishToEdit = dish
    },
    UPDATE_DISH(state, newDish) {
        let dish = state.dishes.find(oldDish => oldDish.id === newDish.id)
        if (!dish) {
            this.commit('ADD_DISH', newDish);
        } else {
            dish.name = newDish.name
            dish.description = newDish.description
            dish.category = newDish.category
            dish.image = newDish.image
            dish.price = newDish.price
            dish.ingredients = newDish.ingredients
        }
    },
    DELETE_DISH(state, id) {
        const index = state.dishes.findIndex(dish => dish.id === id)
        state.dishes.splice(index, 1)
    }
}

export const actions = {
    createDish({commit}, dish) {
        return dishApi.postDish(dish)
            .then(response => {
                commit('ADD_DISH', response.data)
            })
    },
    fetchDishes({commit}) {
        return dishApi.getDishes()
            .then(response => {
                commit('SET_DISHES', response.data)
            })
    },
    fetchDishToEdit({commit}, id) {
        return dishApi.getDish(id)
            .then(response => {
                commit('SET_DISH_TO_EDIT', response.data)
            })
    },
    updateDish({commit}, updatedDish) {
        return dishApi.updateDish(updatedDish.id, updatedDish)
            .then(response => {
                commit('UPDATE_DISH', response.data)
            })
    },
    deleteDish({commit}, dishId) {
        return dishApi.deleteDish(dishId)
            .then(response => {
                if (response.data === true) {
                    commit('DELETE_DISH', dishId)
                }
            })
    }
}
