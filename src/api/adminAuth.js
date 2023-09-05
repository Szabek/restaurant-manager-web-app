import axios from "axios";

export const login = (credentials) => axios.post('/auth/authenticate', credentials)
export const logout = () => axios.post('/auth/logout')