import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/config/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, FileText, CheckCircle, XCircle, Eye, Search, Filter, PenSquare, Plus } from 'lucide-react';

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [adminRemark, setAdminRemark] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const [createBlogOpen, setCreateBlogOpen] = useState(false);
    const [createBlogForm, setCreateBlogForm] = useState({
        title: '',
        content: '',
        author: '',
        category: '',
        featuredImage: '',
        tags: '',
        status: 'PUBLISHED'
    });
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axiosInstance.get('/blog/posts');
            setBlogs(response.data);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to fetch blog posts',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (blogId, newStatus) => {
        setActionLoading(true);
        try {
            await axiosInstance.put(`/blog/posts/${blogId}/status`, {
                status: newStatus,
                adminRemark: adminRemark,
            });

            toast({
                title: 'Success',
                description: `Blog post ${newStatus.toLowerCase()} successfully`,
            });

            // Refresh blogs
            fetchBlogs();
            setSelectedBlog(null);
            setAdminRemark('');
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to update blog status',
                variant: 'destructive',
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleCreateBlog = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            const tagsArray = createBlogForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            const payload = {
                ...createBlogForm,
                tags: tagsArray
            };
            await axiosInstance.post('/blog/posts', payload);
            toast({
                title: 'Success',
                description: 'Blog post created successfully',
            });
            setCreateBlogOpen(false);
            setCreateBlogForm({
                title: '',
                content: '',
                author: '',
                category: '',
                featuredImage: '',
                tags: '',
                status: 'PUBLISHED'
            });
            fetchBlogs();
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to create blog post',
                variant: 'destructive'
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            PENDING: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', label: 'Pending' },
            APPROVED: { color: 'bg-green-100 text-green-800 border-green-300', label: 'Approved' },
            REJECTED: { color: 'bg-red-100 text-red-800 border-red-300', label: 'Rejected' },
            PUBLISHED: { color: 'bg-blue-100 text-blue-800 border-blue-300', label: 'Published' },
        };
        const config = statusConfig[status] || statusConfig.PENDING;
        return <Badge className={`${config.color} border`}>{config.label}</Badge>;
    };

    const filteredBlogs = blogs.filter((blog) => {
        const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
        const matchesSearch =
            blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.category?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
            {/* Header */}
            <div className="bg-white border-b border-amber-200 shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                Blog Post Management
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">Review and manage blog post submissions</p>
                        </div>
                        <div className="flex gap-3">
                            <Dialog open={createBlogOpen} onOpenChange={setCreateBlogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-md">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Blog Post
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Add New Blog Post</DialogTitle>
                                        <DialogDescription>
                                            Create and publish a new blog post.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleCreateBlog} className="space-y-4">
                                        <div>
                                            <Label htmlFor="blog-title">Title</Label>
                                            <Input
                                                id="blog-title"
                                                value={createBlogForm.title}
                                                onChange={(e) => setCreateBlogForm({ ...createBlogForm, title: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="blog-author">Author</Label>
                                            <Input
                                                id="blog-author"
                                                value={createBlogForm.author}
                                                onChange={(e) => setCreateBlogForm({ ...createBlogForm, author: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="blog-category">Category</Label>
                                            <Input
                                                id="blog-category"
                                                value={createBlogForm.category}
                                                onChange={(e) => setCreateBlogForm({ ...createBlogForm, category: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="blog-image">Featured Image URL</Label>
                                            <Input
                                                id="blog-image"
                                                value={createBlogForm.featuredImage}
                                                onChange={(e) => setCreateBlogForm({ ...createBlogForm, featuredImage: e.target.value })}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="blog-tags">Tags (comma separated)</Label>
                                            <Input
                                                id="blog-tags"
                                                value={createBlogForm.tags}
                                                onChange={(e) => setCreateBlogForm({ ...createBlogForm, tags: e.target.value })}
                                                placeholder="solar, energy, green"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="blog-content">Content</Label>
                                            <Textarea
                                                id="blog-content"
                                                value={createBlogForm.content}
                                                onChange={(e) => setCreateBlogForm({ ...createBlogForm, content: e.target.value })}
                                                required
                                                className="min-h-[200px]"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white"
                                            disabled={actionLoading}
                                        >
                                            {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Post'}
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <Button
                                onClick={() => navigate('/admin/dashboard')}
                                variant="outline"
                                className="border-amber-300 text-amber-700 hover:bg-amber-50"
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                Dashboard
                            </Button>
                            <Button
                                onClick={() => navigate('/admin/vendor-management')}
                                variant="outline"
                                className="border-amber-300 text-amber-700 hover:bg-amber-50"
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                Vendor Management
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
            < div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" >
                {/* Filters */}
                < Card className="mb-6 shadow-lg border-amber-200/50" >
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <Label htmlFor="search" className="text-sm font-medium mb-2 block">
                                    Search Blog Posts
                                </Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="search"
                                        placeholder="Search by title, author, or category..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 border-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="sm:w-48">
                                <Label htmlFor="status-filter" className="text-sm font-medium mb-2 block">
                                    Filter by Status
                                </Label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger id="status-filter" className="border-gray-300">
                                        <Filter className="w-4 h-4 mr-2" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="APPROVED">Approved</SelectItem>
                                        <SelectItem value="REJECTED">Rejected</SelectItem>
                                        <SelectItem value="PUBLISHED">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card >

                {/* Blogs Table */}
                < Card className="shadow-lg border-amber-200/50" >
                    <CardHeader>
                        <CardTitle className="text-xl">Blog Posts ({filteredBlogs.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                            </div>
                        ) : filteredBlogs.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <PenSquare className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                <p>No blog posts found</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Author</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Admin Remark</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredBlogs.map((blog) => (
                                            <TableRow key={blog.id} className="hover:bg-amber-50/50">
                                                <TableCell className="font-medium">#{blog.id}</TableCell>
                                                <TableCell className="max-w-xs truncate font-medium">{blog.title}</TableCell>
                                                <TableCell>{blog.author}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="border-amber-300 text-amber-700">
                                                        {blog.category}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{getStatusBadge(blog.status)}</TableCell>
                                                <TableCell className="max-w-xs truncate">{blog.adminRemark || '-'}</TableCell>
                                                <TableCell className="text-right">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setSelectedBlog(blog);
                                                                    setAdminRemark(blog.adminRemark || '');
                                                                }}
                                                                className="border-amber-300 text-amber-700 hover:bg-amber-50"
                                                            >
                                                                <Eye className="w-4 h-4 mr-1" />
                                                                Review
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                                            <DialogHeader>
                                                                <DialogTitle>Review Blog Post #{selectedBlog?.id}</DialogTitle>
                                                                <DialogDescription>
                                                                    Review and update the status of this blog post
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            {selectedBlog && (
                                                                <div className="space-y-4">
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div className="col-span-2">
                                                                            <Label className="text-sm font-medium text-gray-700">Title</Label>
                                                                            <p className="mt-1 text-lg font-semibold">{selectedBlog.title}</p>
                                                                        </div>
                                                                        <div>
                                                                            <Label className="text-sm font-medium text-gray-700">Author</Label>
                                                                            <p className="mt-1 text-sm">{selectedBlog.author}</p>
                                                                        </div>
                                                                        <div>
                                                                            <Label className="text-sm font-medium text-gray-700">Category</Label>
                                                                            <div className="mt-1">
                                                                                <Badge variant="outline" className="border-amber-300 text-amber-700">
                                                                                    {selectedBlog.category}
                                                                                </Badge>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <Label className="text-sm font-medium text-gray-700">Current Status</Label>
                                                                            <div className="mt-1">{getStatusBadge(selectedBlog.status)}</div>
                                                                        </div>
                                                                        <div>
                                                                            <Label className="text-sm font-medium text-gray-700">Created Date</Label>
                                                                            <p className="mt-1 text-sm">
                                                                                {selectedBlog.createdDate ? new Date(selectedBlog.createdDate).toLocaleDateString() : '-'}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    {selectedBlog.featuredImage && (
                                                                        <div>
                                                                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Featured Image</Label>
                                                                            <img
                                                                                src={selectedBlog.featuredImage}
                                                                                alt="Featured"
                                                                                className="w-full max-h-64 object-cover border border-gray-300 rounded-lg"
                                                                            />
                                                                        </div>
                                                                    )}

                                                                    <div>
                                                                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Content</Label>
                                                                        <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
                                                                            <p className="text-sm whitespace-pre-wrap">{selectedBlog.content}</p>
                                                                        </div>
                                                                    </div>

                                                                    {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                                                                        <div>
                                                                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Tags</Label>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {selectedBlog.tags.map((tag, index) => (
                                                                                    <Badge key={index} variant="secondary">
                                                                                        {tag}
                                                                                    </Badge>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    <div>
                                                                        <Label htmlFor="admin-remark" className="text-sm font-medium text-gray-700">
                                                                            Admin Remark
                                                                        </Label>
                                                                        <Textarea
                                                                            id="admin-remark"
                                                                            value={adminRemark}
                                                                            onChange={(e) => setAdminRemark(e.target.value)}
                                                                            placeholder="Enter your remarks here..."
                                                                            className="mt-1 min-h-24"
                                                                        />
                                                                    </div>

                                                                    <div className="flex gap-3 pt-4">
                                                                        <Button
                                                                            onClick={() => handleStatusUpdate(selectedBlog.id, 'APPROVED')}
                                                                            disabled={actionLoading}
                                                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                                                        >
                                                                            {actionLoading ? (
                                                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                            ) : (
                                                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                                            )}
                                                                            Approve
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() => handleStatusUpdate(selectedBlog.id, 'PUBLISHED')}
                                                                            disabled={actionLoading}
                                                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                                                        >
                                                                            {actionLoading ? (
                                                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                            ) : (
                                                                                <PenSquare className="w-4 h-4 mr-2" />
                                                                            )}
                                                                            Publish
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() => handleStatusUpdate(selectedBlog.id, 'REJECTED')}
                                                                            disabled={actionLoading}
                                                                            variant="destructive"
                                                                            className="flex-1"
                                                                        >
                                                                            {actionLoading ? (
                                                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                            ) : (
                                                                                <XCircle className="w-4 h-4 mr-2" />
                                                                            )}
                                                                            Reject
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card >
            </div >
        </div >
    );
};

export default BlogManagement;
