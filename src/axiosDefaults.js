import axios from "axios";
import store from './store/index'
import router from "@/router";
import {API_URL} from "../constans";

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(function (config) {
    const userString = localStorage.getItem('user');
    userString ? config.headers.Authorization = 'Bearer ' + JSON.parse(userString).token : false;
    return config
})

axios.interceptors.response.use(
    response => response,
    error => {
        switch (error.response.status) {
            case 401:
                store.dispatch('auth/logout')
                break;
            case 403:
                store.dispatch('auth/logout')
                break;
            case 404:
                router.push({name: 'Page404'})
                break;
            case 500:
                router.push({name: 'Page500'})
                break;
        }

        return Promise.reject(error)
    }
)
