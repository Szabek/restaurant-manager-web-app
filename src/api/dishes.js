import axios from "axios";

export const getDishes = () => axios.get('/dish/all')
export const getDish = (dishId) => axios.get(`/dish/${dishId}`)
export const postDish = (dish) => axios.post('/dish/add', dish, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
export const updateDish = (dishId, data) => axios.put(`/dish/update/${dishId}`, data, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
export const deleteDish = (dishId) => axios.delete(`/dish/delete/${dishId}`)