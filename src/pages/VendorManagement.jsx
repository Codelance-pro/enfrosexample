import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/config/axios';
import vendorAxios from '@/config/vendorAxios';
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
import { Loader2, LogOut, FileText, CheckCircle, XCircle, Eye, Search, Filter, Users, Download, Plus } from 'lucide-react';

const VendorManagement = () => {
    const [bills, setBills] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [selectedVendorId, setSelectedVendorId] = useState('all');
    const [loading, setLoading] = useState(true);
    const [selectedBill, setSelectedBill] = useState(null);
    const [adminRemark, setAdminRemark] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const [createVendorOpen, setCreateVendorOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const isFirstRender = useRef(true);
    const [createVendorForm, setCreateVendorForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'VENDOR',
        status: 'ACTIVE'
    });
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        setLoading(true);
        fetchVendors();
        setLoading(false);

    }, []);

    useEffect(() => {
        fetchAllBills(currentPage, selectedVendorId, searchQuery);
    }, [currentPage]);

    // Debounce search
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            if (currentPage === 1) {
                fetchAllBills(1, selectedVendorId, searchQuery);
            } else {
                setCurrentPage(1);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);


    const fetchVendors = async () => {
        try {
            const response = await axiosInstance.get('/users/alluser');

            setVendors(response.data);
        } catch (error) {
            console.error("Failed to fetch vendors:", error);
        }
    };

    const fetchAllBills = async (page = 1, vendorId = 'all', search = '') => {
        setLoading(true);
        try {
            let response;

            if (search && search.trim().length > 0) {
                // Search endpoint
                response = await axiosInstance.get('vendor/purchase/admin/vendor/bills/search', {
                    params: {
                        q: search,
                        page: page - 1,
                        size: itemsPerPage,
                    },
                });
            } else if (vendorId === 'all') {
                // Fetch all bills with pagination
                response = await axiosInstance.get('/vendor/purchase', {
                    params: {
                        page: page - 1, // Spring uses 0-based index
                        size: itemsPerPage,
                    },
                });
                console.log("response", response.data);
            } else {
                // Fetch vendor-specific bills with pagination using new endpoint
                response = await axiosInstance.get(`/vendor/purchase/${vendorId}/bills`, {
                    params: {
                        page: page - 1, // Spring uses 0-based index
                        size: itemsPerPage,
                    },
                });
            }

            console.log("response", response.data);

            setBills(response.data.content);        // 👈 only 10 items
            setTotalPages(response.data.totalPages); // 👈 real page count
        } catch (error) {
            console.error("Error fetching bills:", error);
            setBills([]);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    };



    //   const fetchVendorBills = async (vendorId) => {
    //   setLoading(true);
    //   try {
    //     const response = await axiosInstance.get(`/admin/purchases/vendor/${vendorId}`);
    //     const data = response.data;
    //
    //     if (Array.isArray(data)) {
    //       setBills(data);
    //     } else if (Array.isArray(data?.content)) {
    //       setBills(data.content);
    //     } else {
    //       setBills([]);
    //     }
    //   } catch (error) {
    //     setBills([]);
    //   } finally {
    //     setLoading(false);
    //   }
    // };


    const handleVendorChange = (vendorId) => {
        setSelectedVendorId(vendorId);
        setSearchQuery(''); // Clear search when changing vendor filter to avoid confusion
        setCurrentPage(1); // Reset to first page when changing vendor
        fetchAllBills(1, vendorId, '');
    };

    const handleApproveStatusUpdate = async (billId) => {
        setActionLoading(true);
        try {
            await axiosInstance.put(`/admin/purchases/${billId}/approve`);
            toast({
                title: 'Success',
                description: `Bill approved successfully`,
            });

            fetchAllBills(currentPage, selectedVendorId, searchQuery);
            setSelectedBill(null);
            setAdminRemark('');
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to update bill status',
                variant: 'destructive',
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleRejectStatusUpdate = async (billId) => {
        setActionLoading(true);
        try {
            await axiosInstance.put(`/admin/purchases/${billId}/reject`, {
                adminRemark: adminRemark,
            });
            toast({
                title: 'Success',
                description: `Bill rejected successfully`,
            });

            fetchAllBills(currentPage, selectedVendorId, searchQuery);
            setSelectedBill(null);
            setAdminRemark('');
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to update bill status',
                variant: 'destructive',
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleCreateVendor = async (e) => {
        e.preventDefault();
        setActionLoading(true);

        try {
            const payload = {
                ...createVendorForm,
                role: 'VENDOR',
                status: 'ACTIVE',
            };

            const response = await axiosInstance.post('/users', payload);

            console.log("response", response);

            toast({
                title: 'Vendor Created',
                description: 'Vendor created and email sent successfully',
            });

            setCreateVendorOpen(false);
            // fetchVendors();

        } catch (error) {

            console.log("error", error);
            // ✅ Axios error structure
            // const status = error.response?.status;
            // const message =
            //     error.response?.data?.message ??
            //     'Unable to process request. Please try again.';

            // if (status === 400) {
            //     toast({
            //         title: 'Email Failed',
            //         description: message,
            //         variant: 'destructive',
            //     });
            //     return;
            // }

            // toast({
            //     title: 'Error',
            //     description: message,
            //     variant: 'destructive',
            // });

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
            DECLINED: { color: 'bg-red-100 text-red-800 border-red-300', label: 'Declined' },
        };
        const config = statusConfig[status] || statusConfig.PENDING;
        return <Badge className={`${config.color} border`}>{config.label}</Badge>;
    };

    const safeBills = Array.isArray(bills) ? bills : [];

    // Client-side filtering only for status now, as search is backend-driven
    const filteredBills = safeBills.filter((bill) => {
        const matchesStatus =
            statusFilter === 'all' || bill.status === statusFilter;
        // console.log(matchesStatus)
        // Search is now handled by backend
        // const query = searchQuery.toLowerCase();
        // const productName = bill.productName?.toLowerCase() || '';
        // const billNumber = bill.billNumber?.toString().toLowerCase() || '';

        return matchesStatus; // && (productName.includes(query) || billNumber.includes(query));
    });


    const downloadInvoice = async (purchaseId) => {
        try {
            const response = await axiosInstance.get(
                `/invoice/${purchaseId}`,
                {
                    responseType: "blob"
                }
            );
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `invoice_${purchaseId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to download invoice',
                variant: 'destructive',
            });
        }
    };

    const downloadBill = async (purchaseId) => {
        try {
            const response = await axiosInstance.get(
                `/vendor/purchase/download/${purchaseId}`,
                {
                    responseType: "blob",
                }
            );
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `bill_${purchaseId}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            try {
                const response = await axiosInstance.get(
                    `/admin/purchases/download/${purchaseId}`,
                    {
                        responseType: "blob",
                    }
                );
                const blob = new Blob([response.data], { type: "application/pdf" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `bill_${purchaseId}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } catch (retryError) {
                toast({
                    title: 'Download Failed',
                    description: 'Could not download the bill PDF.',
                    variant: 'destructive',
                });
            }
        }
    };





    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
            {/* Header */}
            <div className="bg-white border-b border-amber-200 shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                Vendor Bill Management
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">Review and manage vendor bill submissions</p>
                        </div>
                        <div className="flex gap-3">
                            <Dialog open={createVendorOpen} onOpenChange={setCreateVendorOpen}>
                                <DialogTrigger asChild>
                                    {/* <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-md">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Vendor
                                    </Button> */}
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Vendor</DialogTitle>
                                        <DialogDescription>Create a new vendor account.</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleCreateVendor} className="space-y-4">
                                        <div>
                                            <Label htmlFor="vendor-name">Name</Label>
                                            <Input
                                                id="vendor-name"
                                                value={createVendorForm.name}
                                                onChange={(e) => setCreateVendorForm({ ...createVendorForm, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="vendor-email">Email</Label>
                                            <Input
                                                id="vendor-email"
                                                type="email"
                                                value={createVendorForm.email}
                                                onChange={(e) => setCreateVendorForm({ ...createVendorForm, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="vendor-password">Password</Label>
                                            <Input
                                                id="vendor-password"
                                                type="password"
                                                value={createVendorForm.password}
                                                onChange={(e) => setCreateVendorForm({ ...createVendorForm, password: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white"
                                            disabled={actionLoading}
                                        >
                                            {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Vendor'}
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <Button onClick={() => navigate('/admin/dashboard')} variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                                Dashboard
                            </Button>
                            <Button onClick={handleLogout} variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <Card className="mb-6 shadow-lg border-amber-200/50">
                    <CardContent className="pt-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="lg:w-64">
                                <Label htmlFor="vendor-select" className="text-sm font-medium mb-2 block">Filter by Vendor</Label>
                                <Select value={selectedVendorId} onValueChange={handleVendorChange}>
                                    <SelectTrigger id="vendor-select" className="border-gray-300 ">
                                        <Users className="w-4 h-4 mr-2 text-gray-500" />
                                        <SelectValue placeholder="Select Vendor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Vendors</SelectItem>
                                        {vendors.map((vendor) => (
                                            <SelectItem className="bg-white" key={vendor.id} value={vendor.user.toString()}>{vendor.vendorName}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="search" className="text-sm font-medium mb-2 block">Search Bills</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="search"
                                        placeholder="Search by product name or bill number..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 border-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="sm:w-48">
                                <Label htmlFor="status-filter" className="text-sm font-medium mb-2 block">Filter by Status</Label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger id="status-filter" className="border-gray-300">
                                        <Filter className="w-4 h-4 mr-2" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="APPROVED">Approved</SelectItem>
                                        <SelectItem value="DECLINED">Declined</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bills Table */}
                <Card className="shadow-lg border-amber-200/50">
                    <CardHeader>
                        <CardTitle className="text-xl">
                            {selectedVendorId === 'all' ? 'All Vendor Bills' : 'Vendor Bills'} ({filteredBills.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                            </div>
                        ) : filteredBills.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                <p>No bills found</p>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>ID</TableHead>
                                                <TableHead>Product Name</TableHead>
                                                <TableHead>Bill Number</TableHead>
                                                <TableHead>Project #</TableHead>
                                                <TableHead>Project Code</TableHead>
                                                <TableHead>PO #</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>CreatedAt</TableHead>
                                                <TableHead>Reviewed At</TableHead>
                                                <TableHead>Admin Remark</TableHead>
                                                <TableHead>PDF</TableHead>
                                                <TableHead>Invoice</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredBills.map((bill) => (
                                                <TableRow key={bill.id} className="hover:bg-amber-50/50">
                                                    <TableCell className="font-medium">#{bill.id}</TableCell>
                                                    <TableCell>{bill.productName}</TableCell>
                                                    <TableCell>{bill.billNumber}</TableCell>
                                                    <TableCell>{bill.projectNumber || '-'}</TableCell>
                                                    <TableCell>{bill.projectCode || '-'}</TableCell>
                                                    <TableCell>{bill.poNumber || '-'}</TableCell>
                                                    <TableCell className="font-semibold">₹{bill.amount?.toLocaleString()}</TableCell>
                                                    <TableCell>{getStatusBadge(bill.status)}</TableCell>
                                                    <TableCell>{bill.createdAt?.split('T')[0]}</TableCell>
                                                    <TableCell>{bill.reviewedAt?.split('T')[0]}</TableCell>
                                                    <TableCell className="max-w-xs truncate">{bill.adminRemark || '-'}</TableCell>
                                                    <TableCell>
                                                        {bill.billPdfUrl ? (
                                                            <button onClick={() => downloadBill(bill.id)} className="text-amber-600 hover:underline flex items-center gap-1">
                                                                <FileText className="w-4 h-4" />
                                                                <span className="text-xs">Download</span>
                                                            </button>
                                                        ) : <span className="text-gray-400">-</span>}
                                                    </TableCell>
                                                    <TableCell>
                                                        {bill.status === 'APPROVED' && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => downloadInvoice(bill.id)}
                                                                className="border-green-300 text-green-700 hover:bg-green-50"
                                                            >
                                                                <Download className="w-4 h-4 mr-1" /> Download
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        setSelectedBill(bill);
                                                                        setAdminRemark(bill.adminRemark || '');
                                                                    }}
                                                                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                                                                >
                                                                    <Eye className="w-4 h-4 mr-1" /> Review
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-2xl">
                                                                <DialogHeader>
                                                                    <DialogTitle>Review Bill #{selectedBill?.id}</DialogTitle>
                                                                    <DialogDescription>Review and update the status of this vendor bill</DialogDescription>
                                                                </DialogHeader>
                                                                {selectedBill && (
                                                                    <div className="space-y-4">
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                            <div>
                                                                                <Label className="text-sm font-medium text-gray-700">Product Name</Label>
                                                                                <p className="mt-1 text-sm">{selectedBill.productName}</p>
                                                                            </div>
                                                                            <div>
                                                                                <Label className="text-sm font-medium text-gray-700">Bill Number</Label>
                                                                                <p className="mt-1 text-sm">{selectedBill.billNumber}</p>
                                                                            </div>
                                                                            <div>
                                                                                <Label className="text-sm font-medium text-gray-700">Project Number</Label>
                                                                                <p className="mt-1 text-sm">{selectedBill.projectNumber || '-'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <Label className="text-sm font-medium text-gray-700">Project Code</Label>
                                                                                <p className="mt-1 text-sm">{selectedBill.projectCode || '-'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <Label className="text-sm font-medium text-gray-700">PO Number</Label>
                                                                                <p className="mt-1 text-sm">{selectedBill.poNumber || '-'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <Label className="text-sm font-medium text-gray-700">Amount</Label>
                                                                                <p className="mt-1 text-sm font-semibold">₹{selectedBill.amount?.toLocaleString()}</p>
                                                                            </div>
                                                                            <div>
                                                                                <Label className="text-sm font-medium text-gray-700">Current Status</Label>
                                                                                <div className="mt-1">{getStatusBadge(selectedBill.status)}</div>
                                                                            </div>
                                                                        </div>

                                                                        {selectedBill.billImage && (
                                                                            <div>
                                                                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Bill Image</Label>
                                                                                <img
                                                                                    src={selectedBill.billImage}
                                                                                    alt="Bill"
                                                                                    className="w-full max-h-64 object-contain border border-gray-300 rounded-lg"
                                                                                />
                                                                            </div>
                                                                        )}

                                                                        <div>
                                                                            <Label htmlFor="admin-remark" className="text-sm font-medium text-gray-700">Admin Remark</Label>
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
                                                                                onClick={() => handleApproveStatusUpdate(selectedBill.id)}
                                                                                disabled={actionLoading}
                                                                                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                                                            >
                                                                                {actionLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                                                                                Approve
                                                                            </Button>
                                                                            <Button
                                                                                onClick={() => handleRejectStatusUpdate(selectedBill.id)}
                                                                                disabled={actionLoading}
                                                                                variant="destructive"
                                                                                className="flex-1"
                                                                            >
                                                                                {actionLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <XCircle className="w-4 h-4 mr-2" />}
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

                                {/* Pagination */}
                                {totalPages > 0 && (
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-amber-100">
                                        <p className="text-sm text-amber-900 font-medium bg-amber-100/50 px-3 py-1 rounded-full">
                                            Showing <span className="font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold">{Math.min(currentPage * itemsPerPage, filteredBills.length)}</span> of <span className="font-bold">{filteredBills.length}</span> bills
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={currentPage === 1}
                                                onClick={() => setCurrentPage((p) => p - 1)}
                                                className="border-amber-200 hover:bg-amber-50 text-amber-700 disabled:opacity-50 transition-all duration-200"
                                            >
                                                Previous
                                            </Button>
                                            <div className="flex items-center gap-1 mx-2">
                                                {[...Array(totalPages)].map((_, index) => {
                                                    const page = index + 1;
                                                    // Only show first, last, and pages around current
                                                    if (
                                                        page === 1 ||
                                                        page === totalPages ||
                                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                                    ) {
                                                        return (
                                                            <Button
                                                                key={page}
                                                                size="sm"
                                                                variant={page === currentPage ? "default" : "outline"}
                                                                className={`w-9 h-9 p-0 transition-all duration-200 ${page === currentPage
                                                                    ? "bg-gradient-to-r from-amber-600 to-orange-600 border-none shadow-md hover:scale-105"
                                                                    : "border-amber-200 hover:bg-amber-50 text-amber-700"
                                                                    }`}
                                                                onClick={() => setCurrentPage(page)}
                                                            >
                                                                {page}
                                                            </Button>
                                                        );
                                                    } else if (
                                                        (page === 2 && currentPage > 3) ||
                                                        (page === totalPages - 1 && currentPage < totalPages - 2)
                                                    ) {
                                                        return <span key={page} className="px-1 text-amber-400">...</span>;
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={currentPage === totalPages}
                                                onClick={() => setCurrentPage((p) => p + 1)}
                                                className="border-amber-200 hover:bg-amber-50 text-amber-700 disabled:opacity-50 transition-all duration-200"
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default VendorManagement;
