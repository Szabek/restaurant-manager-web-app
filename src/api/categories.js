import axios from "axios";

export const getCategories = () => axios.get('/category/all')
export const getCategory = (categoryId) => axios.get(`/category/${categoryId}`)
export const postCategory = (category) => axios.post('/category/add', category)
export const updateCategory = (categoryId, data) => axios.put(`/category/update/${categoryId}`, data)
export const deleteCategory = (categoryId) => axios.delete(`/category/delete/${categoryId}`)