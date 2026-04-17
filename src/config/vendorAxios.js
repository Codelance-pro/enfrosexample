import axios from 'axios';

// Create axios instance with default config
const vendorAxios = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.enfros.net/api',
     baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8084/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
vendorAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('vendorToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        else{
            delete config.headers.Authorization;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
vendorAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        // if (error.response?.status === 401) {
           
        //     localStorage.removeItem('vendorToken');
        //     localStorage.removeItem('vendorUser');
        //     window.location.href = '/vendor/login';
        // }
         if (error.response?.status === 403 || error.response?.status === 401) {
            // 🔥 Token expired or invalid
            localStorage.clear();

            // Optional: prevent redirect loop
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/vendor/login';
            }
        }

        return Promise.reject(error);
    }
);

export default vendorAxios;
