import { Navigate } from 'react-router-dom';

const VendorProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('vendorToken');

    if (!token) {
        return <Navigate to="/vendor/login" replace />;
    }

    return children;
};

export default VendorProtectedRoute;
