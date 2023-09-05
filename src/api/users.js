import axios from "axios";

export const getUsers = () => axios.get('/user/all')
export const getUser = (userId) => axios.get(`/user/${userId}`)
export const getCurrentUser = () => axios.get('/user/authenticated')
export const postUser = (user) => axios.post('/user/add', user)
export const updateUser = (userId, data) => axios.put(`/user/update/${userId}`, data)
export const updateUserTables = (userId, data) => axios.put(`/user/update-tables/${userId}`, data)
export const deleteUser = (userId) => axios.delete(`/user/delete/${userId}`)