import axios from "axios";

export const getUnits = () => axios.get('/unit/all')
export const getUnit = (unitId) => axios.get(`/unit/${unitId}`)
export const postUnit = (unit) => axios.post('/unit/add', unit)
export const updateUnit = (unitId, data) => axios.put(`/unit/update/${unitId}`, data)
export const deleteUnit = (unitId) => axios.delete(`/unit/delete/${unitId}`)