import * as orderApi from "@/api/orders";

export const namespaced = true

export const state = {
    orders: [],
    orderToEdit: {},
    ordersStatuses: []
}

export const mutations = {
    ADD_ORDER(state, order) {
        state.orders.unshift(order)
    },
    ADD_ORDERS(state, newOrders) {
        state.orders.push(...newOrders);
    },
    SET_ORDERS(state, orders) {
        state.orders = orders
    },
    SET_ORDERS_STATUSES(state, orderStatuses) {
        state.ordersStatuses = orderStatuses
    },
    UPDATE_ORDERS_STATUSES(state, newOrderStatus) {
        const orderStatus = state.ordersStatuses.find(oldOrderStatus => oldOrderStatus.id === newOrderStatus.id)
        orderStatus.isReadyToServe = newOrderStatus.isReadyToServe
        orderStatus.tableId = newOrderStatus.tableId
        orderStatus.status = newOrderStatus.status
    },
    SET_ORDER_TO_EDIT(state, orderToEdit) {
        state.orderToEdit = orderToEdit
    },
    UPDATE_ORDER(state, newOrder) {
        const order = state.orders.find(oldOrder => oldOrder.id === newOrder.id)
        order.dishes = newOrder.dishes,
        order.duration = newOrder.duration,
        order.id = newOrder.id,
        order.isReadyToServe = newOrder.isReadyToServe,
        order.orderProcessingStart = newOrder.orderProcessingStart,
        order.startDateTime = newOrder.startDateTime,
        order.status = newOrder.status,
        order.table = newOrder.table,
        order.table = newOrder.totalPrice,
        order.table = newOrder.user
    },
    DELETE_ORDER(state, id) {
        const index = state.orders.findIndex(order => order.id === id)
        state.orders.splice(index, 1)
    }
}

export const actions = {
    createOrder({commit}, order) {
        return orderApi.postOrder(order)
            .then(response => {
                commit('ADD_ORDER', response.data)
            })
    },
    fetchOrders({commit}) {
        return orderApi.getOrders()
            .then(response => {
                commit('SET_ORDERS', response.data)
            })
    },
    fetchAllOpenedOrders({commit}) {
        return orderApi.getAllOpenedOrders()
            .then(response => {
                commit('SET_ORDERS', response.data)
            })
    },
    fetchOrdersByStatus({ commit, state }, orderStatus) {
        return orderApi.getOrdersByStatus(orderStatus)
            .then(response => {
                const modifiedOrders = response.data.map(order => {
                    const existingOrder = state.orders.find(o => o.id === order.id);
                    if (existingOrder) {
                        order.orderItems.forEach(item => {
                            const existingItem = existingOrder.orderItems.find(i => i.id === item.id);
                            if (existingItem) {
                                item.ready = existingItem.ready;
                            }
                        });
                    }
                    return order;
                });
                commit('SET_ORDERS', modifiedOrders);
            });
    },
    fetchOrdersInRange({ commit }, {startDate, endDate, status}) {
        return orderApi.getOrdersInRange(startDate, endDate, status)
            .then(response => {
                commit('SET_ORDERS', response.data);
            });
    },
    fetchAllOrdersStatuses({commit}) {
        return orderApi.getOpenOrderServeStatus()
            .then(response => {
                commit('SET_ORDERS_STATUSES', response.data)
            })
    },
    fetchOrderToEdit({ commit }, id) {
        return orderApi.getOrder(id)
            .then(response => {
                const order = response.data;
                const dishes = order.orderItems.map(orderItem => {
                    const dish = orderItem.dish;
                    return { ...dish, quantity: orderItem.quantity, ready: orderItem.ready };
                });
                const updatedOrder = { ...order, dishes };
                commit('SET_ORDER_TO_EDIT', updatedOrder);
            });
    },
    updateOrder({commit}, updatedOrder) {
        return orderApi.updateOrder(updatedOrder.id, updatedOrder)
            .then(response => {
                commit('UPDATE_ORDER', response.data)
            })
    },
    setReadyToServe(_, data) {
        return orderApi.setReadyToServe(data.id, data.isReady)
    },
    addDishToOrderToEdit({ commit, state }, dish) {
        const existingDishIndex = state.orderToEdit.dishes.findIndex(item => item.id === dish.id && item.newDish === true);
        if (existingDishIndex !== -1) {
            const updatedDishes = state.orderToEdit.dishes.map((item, index) => {
                if (index === existingDishIndex) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            commit('SET_ORDER_TO_EDIT', { ...state.orderToEdit, dishes: updatedDishes });
        } else {
            const updatedDishes = [...state.orderToEdit.dishes, { ...dish, quantity: 1, newDish: true }];
            commit('SET_ORDER_TO_EDIT', { ...state.orderToEdit, dishes: updatedDishes });
        }
    },
    removeDishFromOrderToEdit({ commit, state }, dish) {
        const updatedDishes = state.orderToEdit.dishes.filter(d => d !== dish);
        commit('SET_ORDER_TO_EDIT', { ...state.orderToEdit, dishes: updatedDishes });
    },
    deleteOrder({commit}, orderId) {
        return orderApi.deleteOrder(orderId)
            .then(response => {
                if (response.data === true) {
                    commit('DELETE_ORDER', orderId)
                }
            })
    }
}
