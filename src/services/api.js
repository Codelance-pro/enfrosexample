import axiosInstance from '@/config/axios';

/**
 * Admin Authentication Services
 */
export const adminAuthService = {
    // Login admin user
    login: async (email, password) => {
        const response = await axiosInstance.post('/auth/', {
            email,
            password,
        });
        console.log("dats",response)
        return response.data;
    },

    // Logout admin user
    logout: () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('adminToken');
    },

    // Get current admin user
    getCurrentUser: () => {
        const user = localStorage.getItem('adminUser');
        return user ? JSON.parse(user) : null;
    },
};

/**
 * Vendor Bill Services
 */
export const vendorBillService = {
    // Get all vendor bills
    getAllBills: async () => {
        const response = await axiosInstance.get('/admin/');
        return response.data;
    },

    // Get bill by ID
    getBillById: async (id) => {
        const response = await axiosInstance.get(`/vendor/bills/${id}`);
        return response.data;
    },

    // Update bill status
    updateBillStatus: async (id, status, adminRemark) => {
        const response = await axiosInstance.put(`/vendor/bills/${id}/status`, {
            status,
            adminRemark,
        });
        return response.data;
    },

    // Create new bill (vendor side)
    createBill: async (billData) => {
        const response = await axiosInstance.post('/vendor/bills', billData);
        return response.data;
    },

    // Upload bill image
    uploadBillImage: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axiosInstance.post('/vendor/bills/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};

/**
 * Blog Post Services
 */
export const blogPostService = {
    // Get all blog posts
    getAllPosts: async () => {
        const response = await axiosInstance.get('/blog/posts');
        return response.data;
    },

    // Get post by ID
    getPostById: async (id) => {
        const response = await axiosInstance.get(`/blog/posts/${id}`);
        return response.data;
    },

    // Update post status
    updatePostStatus: async (id, status, adminRemark) => {
        const response = await axiosInstance.put(`/blog/posts/${id}/status`, {
            status,
            adminRemark,
        });
        return response.data;
    },

    // Create new post (author side)
    createPost: async (postData) => {
        const response = await axiosInstance.post('/blog/posts', postData);
        return response.data;
    },

    // Upload featured image
    uploadFeaturedImage: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axiosInstance.post('/blog/posts/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Get published posts (public)
    getPublishedPosts: async () => {
        const response = await axiosInstance.get('/blog/posts/published');
        return response.data;
    },
};

/**
 * Example usage:
 * 
 * // Login
 * const { token, user } = await adminAuthService.login('admin@example.com', 'password');
 * 
 * // Get all vendor bills
 * const bills = await vendorBillService.getAllBills();
 * 
 * // Approve a bill
 * await vendorBillService.updateBillStatus(1, 'APPROVED', 'Bill verified and approved');
 * 
 * // Get all blog posts
 * const posts = await blogPostService.getAllPosts();
 * 
 * // Publish a blog post
 * await blogPostService.updatePostStatus(1, 'PUBLISHED', 'Great content!');
 */
