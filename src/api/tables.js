import axios from "axios";

export const getTables = () => axios.get('/table/all')
export const getTable = (tableId) => axios.get(`/table/${tableId}`)
export const postTable = (table) => axios.post('/table/add', table)
export const updateTable = (tableId, data) => axios.put(`/table/update/${tableId}`, data)
export const deleteTable = (tableId) => axios.delete(`/table/delete/${tableId}`)