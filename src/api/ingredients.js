import axios from "axios";

export const getIngredients = () => axios.get('/ingredient/all')
export const getIngredient = (ingredientId) => axios.get(`/ingredient/${ingredientId}`)
export const postIngredient = (ingredient) => axios.post('/ingredient/add', ingredient)
export const updateIngredient = (ingredientId, data) => axios.put(`/ingredient/update/${ingredientId}`, data)
export const deleteIngredient = (ingredientId) => axios.delete(`/ingredient/delete/${ingredientId}`)