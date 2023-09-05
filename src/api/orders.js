import axios from "axios";

export const getOrders = () => axios.get('/order/all')
export const getAllOpenedOrders = () => axios.get('/order/all-opened')
export const getOpenOrderServeStatus = () => axios.get('/order/serve-status')
export const getOrder = (orderId) => axios.get(`/order/${orderId}`)
export const getOrdersByStatus = (orderStatus) => axios.get(`/order/status?status=${orderStatus}`)
export const getOrdersInRange = (startDate, endDate, status) => axios.get(`/order/range?startDate=${startDate}&endDate=${endDate}&status=${status}`)
export const postOrder = (order) => axios.post('/order/add', order)
export const updateOrder = (orderId, data) => axios.put(`/order/update/${orderId}`, data)
export const setReadyToServe = (orderId, isReady) => axios.put(`/order/set-ready/${orderId}?isReady=${isReady}`, isReady)
export const deleteOrder = (orderId) => axios.delete(`/order/delete/${orderId}`)
