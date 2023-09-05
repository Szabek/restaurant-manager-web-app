import * as statisticApi from "@/api/statistics";

export const namespaced = true

export const state = {
    ordersCountStatistics: [],
    totalPriceStatistics: [],
    waitersStatistics: [],
    dishesStatistics: [],
    ingredientsStatistics: [],
    trafficStatistics: []
}

export const mutations = {
    SET_ORDERS_COUNT_STATISTICS(state, ordersStatistics) {
        state.ordersCountStatistics = ordersStatistics
    },
    SET_TOTAL_PRICE_STATISTICS(state, totalPriceStatistics) {
        state.totalPriceStatistics = totalPriceStatistics
    },
    SET_WAITERS_STATISTICS(state, waitersStatistics) {
        state.waitersStatistics = waitersStatistics
    },
    SET_DISHES_STATISTICS(state, dishesStatistics) {
        state.dishesStatistics = dishesStatistics
    },
    SET_INGREDIENTS_STATISTICS(state, ingredientsStatistics) {
        state.ingredientsStatistics = ingredientsStatistics
    },
    SET_TRAFFIC_STATISTICS(state, trafficStatistics) {
        state.trafficStatistics = trafficStatistics
    }
}

export const actions = {
    fetchOrdersStatistics({ commit }, { startDate, endDate }) {
        return statisticApi.getOrderCountStatistics(startDate, endDate)
            .then(response => {
                commit('SET_ORDERS_COUNT_STATISTICS', response.data)
            })
    },
    fetchTotalPriceStatistics({commit}, { startDate, endDate }) {
        return statisticApi.getTotalPriceStatistics(startDate, endDate)
            .then(response => {
                commit('SET_TOTAL_PRICE_STATISTICS', response.data)
            })
    },
    fetchWaitersStatistics({commit}, { startDate, endDate }) {
        return statisticApi.getWaitersStatistics(startDate, endDate)
            .then(response => {
                commit('SET_WAITERS_STATISTICS', response.data)
            })
    },
    fetchDishesStatistics({commit}, { startDate, endDate }) {
        return statisticApi.getDishesStatistics(startDate, endDate)
            .then(response => {
                commit('SET_DISHES_STATISTICS', response.data)
            })
    },
    fetchIngredientsStatistics({commit}, { startDate, endDate }) {
        return statisticApi.getIngredientsStatistics(startDate, endDate)
            .then(response => {
                commit('SET_INGREDIENTS_STATISTICS', response.data)
            })
    },
    fetchTrafficStatistics({commit}, date) {
        return statisticApi.getTrafficStatistics(date)
            .then(response => {
                commit('SET_TRAFFIC_STATISTICS', response.data)
            })
    }
}
