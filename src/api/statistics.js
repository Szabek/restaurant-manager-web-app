import axios from "axios";
export const getOrderCountStatistics = (startDate, endDate) => axios.get(`/statistic/order-count-statistics?startDate=${startDate}&endDate=${endDate}`)
export const getTotalPriceStatistics = (startDate, endDate) => axios.get(`/statistic/total-price-statistics?startDate=${startDate}&endDate=${endDate}`)
export const getWaitersStatistics = (startDate, endDate) => axios.get(`/statistic/waiter-statistics?startDate=${startDate}&endDate=${endDate}`)
export const getDishesStatistics = (startDate, endDate) => axios.get(`/statistic/dish-statistics?startDate=${startDate}&endDate=${endDate}`)
export const getIngredientsStatistics = (startDate, endDate) => axios.get(`/statistic/ingredient-statistics?startDate=${startDate}&endDate=${endDate}`)
export const getTrafficStatistics = (date) => axios.get(`/statistic/traffic-statistics?date=${date}`)