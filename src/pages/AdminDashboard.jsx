import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/config/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
    Loader2,
    LogOut,
    FileText,
    Receipt,
    CheckCircle,
    XCircle,
    Clock,
    TrendingUp,
    Users,
    PenSquare,
    BarChart3
} from 'lucide-react';

const AdminDashboard = () => {
    const [vendorStats, setVendorStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
    });

    const [blogStats, setBlogStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        published: 0,
    });

    const [recentBills, setRecentBills] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        fetchVendorStats();
    }, []);

    const fetchVendorStats = async () => {
        try {
            const response = await axiosInstance.get('/vendor/purchase/bill-summary');
            const data = response.data;

            const newVendorStats = {
                total: data.total || data.totalBills || 0,
                pending: data.pending || data.PENDING || 0,
                approved: data.approved || data.APPROVED || 0,
                rejected: data.rejected || data.declined || data.REJECTED || data.DECLINED || 0,
            };

            setVendorStats(newVendorStats);
        } catch (error) {
            console.error('Error fetching vendor stats:', error);
        }
        finally {
            setLoading(false);
        }
    };

    const fetchBlogStats = async () => {
        try {
            const response = await axiosInstance.get('/blog/posts');
            const posts = response.data;

               const newBlogStats = {
                total: posts.length,
                pending: posts.filter(p => p.status === 'PENDING').length,
                approved: posts.filter(p => p.status === 'APPROVED').length,
                rejected: posts.filter(p => p.status === 'REJECTED').length,
                published: posts.filter(p => p.status === 'PUBLISHED').length,
            };

            setBlogStats(newBlogStats);
        } catch (error) {
            console.error('Error fetching blog stats:', error);
        }
    };

    const fetchDashboardData = async () => {
        try {
            // Fetch vendor bill summary
            const summaryResponse = await axiosInstance.get('/vendor/purchase/bill-summary');
            // console.log("summaryResponse", summaryResponse);
            const summaryData = summaryResponse.data;

            // Fetch recent vendor bills (first page, 5 items)
            const recentBillsResponse = await axiosInstance.get('/vendor/purchase', {
                params: { page: 0, size: 5 }
            });
            const recentBillsData = recentBillsResponse.data.content || [];

            // Fetch blog posts
            const postsResponse = await axiosInstance.get('/blog/posts');
            const posts = postsResponse.data;

            // Map summary data to state structure
            const newVendorStats = {
                total: summaryData.total || summaryData.totalBills || 0,
                pending: summaryData.pending || summaryData.PENDING || 0,
                approved: summaryData.approved || summaryData.APPROVED || 0,
                rejected: summaryData.rejected || summaryData.declined || summaryData.REJECTED || summaryData.DECLINED || 0,
            };

            const newBlogStats = {
                total: posts.length,
                pending: posts.filter(p => p.status === 'PENDING').length,
                approved: posts.filter(p => p.status === 'APPROVED').length,
                rejected: posts.filter(p => p.status === 'REJECTED').length,
                published: posts.filter(p => p.status === 'PUBLISHED').length,
            };

            setVendorStats(newVendorStats);
            setBlogStats(newBlogStats);

            // Set recent items
            setRecentBills(recentBillsData);
            setRecentPosts(posts.slice(0, 5));
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to fetch dashboard data',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    // console.log("stats", stats.vendorBills);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            PENDING: { icon: Clock, color: 'text-yellow-600 bg-yellow-100', label: 'Pending' },
            APPROVED: { icon: CheckCircle, color: 'text-green-600 bg-green-100', label: 'Approved' },
            REJECTED: { icon: XCircle, color: 'text-red-600 bg-red-100', label: 'Rejected' },
            PUBLISHED: { icon: TrendingUp, color: 'text-blue-600 bg-blue-100', label: 'Published' },
        };
        const config = statusConfig[status] || statusConfig.PENDING;
        const Icon = config.icon;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                <Icon className="w-3 h-3 mr-1" />
                {config.label}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
                <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
            {/* Header */}
            <div className="bg-white border-b border-amber-200 shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                Management Dashboard
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">Welcome back! Here's your overview</p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                onClick={() => navigate('/admin/vendor-management')}
                                variant="outline"
                                className="border-amber-300 text-amber-700 hover:bg-amber-50"
                            >
                                <Receipt className="w-4 h-4 mr-2" />
                                Vendor Management
                            </Button>
                            <Button
                                onClick={() => navigate('/admin/vendor-accounts')}
                                variant="outline"
                                className="border-amber-300 text-amber-700 hover:bg-amber-50"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Vendor Accounts
                            </Button>
                            <Button
                                onClick={() => navigate('/admin/blog-management')}
                                variant="outline"
                                className="border-amber-300 text-amber-700 hover:bg-amber-50"
                            >
                                <PenSquare className="w-4 h-4 mr-2" />
                                Blog Management
                            </Button>
                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                className="border-red-300 text-red-700 hover:bg-red-50"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Vendor Bills - Total */}
                    <Card className="shadow-lg border-amber-200/50 hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-xs font-medium">Total Vendor Bills</CardDescription>
                            <CardTitle className="text-3xl font-bold text-amber-600">{vendorStats.total}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-gray-600">
                                <Receipt className="w-4 h-4 mr-1" />
                                All submissions
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vendor Bills - Pending */}
                    <Card className="shadow-lg border-yellow-200/50 hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-xs font-medium">Pending Bills</CardDescription>
                            <CardTitle className="text-3xl font-bold text-yellow-600">{vendorStats.pending}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-gray-600">
                                <Clock className="w-4 h-4 mr-1" />
                                Awaiting review
                            </div>
                        </CardContent>
                    </Card>

                    {/* Blog Posts - Total */}
                    <Card className="shadow-lg border-blue-200/50 hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-xs font-medium">Total Blog Posts</CardDescription>
                            <CardTitle className="text-3xl font-bold text-blue-600">{blogStats.total}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-gray-600">
                                <FileText className="w-4 h-4 mr-1" />
                                All submissions
                            </div>
                        </CardContent>
                    </Card>

                    {/* Blog Posts - Pending */}
                    <Card className="shadow-lg border-purple-200/50 hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-xs font-medium">Pending Posts</CardDescription>
                            <CardTitle className="text-3xl font-bold text-purple-600">{blogStats.pending}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-gray-600">
                                <Clock className="w-4 h-4 mr-1" />
                                Awaiting review
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Statistics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Vendor Bills Breakdown */}
                    <Card className="shadow-lg border-amber-200/50">
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl">
                                <BarChart3 className="w-5 h-5 mr-2 text-amber-600" />
                                Vendor Bills Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 mr-2 text-yellow-600" />
                                        <span className="font-medium">Pending</span>
                                    </div>
                                    <span className="text-2xl font-bold text-yellow-600">{vendorStats.pending}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <div className="flex items-center">
                                        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                                        <span className="font-medium">Approved</span>
                                    </div>
                                    <span className="text-2xl font-bold text-green-600">{vendorStats.approved}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                    <div className="flex items-center">
                                        <XCircle className="w-5 h-5 mr-2 text-red-600" />
                                        <span className="font-medium">Rejected</span>
                                    </div>
                                    <span className="text-2xl font-bold text-red-600">{vendorStats.rejected}</span>
                                </div>
                            </div>
                            <Button
                                onClick={() => navigate('/admin/vendor-management')}
                                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                            >
                                Manage Vendor Bills
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Blog Posts Breakdown */}
                    <Card className="shadow-lg border-blue-200/50">
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl">
                                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                                Blog Posts Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 mr-2 text-yellow-600" />
                                        <span className="font-medium">Pending</span>
                                    </div>
                                    <span className="text-2xl font-bold text-yellow-600">{blogStats.pending}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <div className="flex items-center">
                                        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                                        <span className="font-medium">Approved</span>
                                    </div>
                                    <span className="text-2xl font-bold text-green-600">{blogStats.approved}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                    <div className="flex items-center">
                                        <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                                        <span className="font-medium">Published</span>
                                    </div>
                                    <span className="text-2xl font-bold text-blue-600">{blogStats.published}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                    <div className="flex items-center">
                                        <XCircle className="w-5 h-5 mr-2 text-red-600" />
                                        <span className="font-medium">Rejected</span>
                                    </div>
                                    <span className="text-2xl font-bold text-red-600">{blogStats.rejected}</span>
                                </div>
                            </div>
                            <Button
                                onClick={() => navigate('/admin/blog-management')}
                                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            >
                                Manage Blog Posts
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Vendor Bills */}
                    <Card className="shadow-lg border-amber-200/50">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="flex items-center">
                                    <Receipt className="w-5 h-5 mr-2 text-amber-600" />
                                    Recent Vendor Bills
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigate('/admin/vendor-management')}
                                    className="text-amber-600 hover:text-amber-700"
                                >
                                    View All
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentBills.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">No vendor bills yet</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentBills.map((bill) => (
                                        <div
                                            key={bill.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                            onClick={() => navigate('/admin/vendor-management')}
                                        >
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{bill.productName}</p>
                                                <p className="text-xs text-gray-600">Bill #{bill.billNumber}</p>
                                            </div>
                                            <div className="text-right mr-3">
                                                <p className="font-semibold text-sm">₹{bill.amount?.toLocaleString()}</p>
                                            </div>
                                            {getStatusBadge(bill.status)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Blog Posts */}
                    <Card className="shadow-lg border-blue-200/50">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="flex items-center">
                                    <PenSquare className="w-5 h-5 mr-2 text-blue-600" />
                                    Recent Blog Posts
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => navigate('/admin/blog-management')}
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    View All
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentPosts.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">No blog posts yet</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentPosts.map((post) => (
                                        <div
                                            key={post.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                            onClick={() => navigate('/admin/blog-management')}
                                        >
                                            <div className="flex-1">
                                                <p className="font-medium text-sm truncate">{post.title}</p>
                                                <p className="text-xs text-gray-600">by {post.author}</p>
                                            </div>
                                            {getStatusBadge(post.status)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
