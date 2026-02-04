import axios from 'axios'

const http = axios.create({
    baseURL: '/api',
    headers: {
        Accept: 'application/json',
    },
    withCredentials: true,
})

// опционально: перехватчики
http.interceptors.response.use(
    response => response,
    error => {
        console.error('API error:', error)
        return Promise.reject(error)
    }
)

export default http
