import axios from 'axios';

// --------------------------------------------------
// Axios instance
// --------------------------------------------------
const axiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.enfros.net/api',
     baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8084/api',
    withCredentials: false,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --------------------------------------------------
// Request Interceptor
// Always fetch token freshly from localStorage
// --------------------------------------------------
axiosInstance.interceptors.request.use(
    (config) => {
        // 🔥 Use ONE unified key
        const token = localStorage.getItem('adminToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // Ensure old headers are removed
            delete config.headers.Authorization;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// --------------------------------------------------
// Response Interceptor
// Handle expired / invalid token globally
// --------------------------------------------------
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // 🔥 Token expired or invalid
            localStorage.clear();

            // Optional: prevent redirect loop
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
