import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/config/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, Plus, Pencil, Users, Search, Eye } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const VendorAccounts = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const itemsPerPage = 10;

    // Dialog states
    const [createVendorOpen, setCreateVendorOpen] = useState(false);
    const [editVendorOpen, setEditVendorOpen] = useState(false);
    const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

    // Form states
    const [currentVendor, setCurrentVendor] = useState(null);
    const [viewVendor, setViewVendor] = useState(null);

    const [createForm, setCreateForm] = useState({
        name: '',
        email: '',
        password: '',
        vendorCode: '',
        vendorType: '',
        vendorName: '',
        mobileNo: '',
        gstNo: '',
        panNo: '',
        address: '',
        city: '',
        state: '',
        region: '',
        country: '',
        pincode: '',
        bankName: '',
        bankAccountNo: '',
        bankIfsc: '',
        bankAccountHolderName: '',
        bankCountry: '',
        role: 'VENDOR',
        status: 'ACTIVE'
    });

    const [editForm, setEditForm] = useState({
        vendorType: '',
        vendorName: '',
        mobileNo: '',
        gstNo: '',
        panNo: '',
        address: '',
        city: '',
        state: '',
        region: '',
        country: '',
        pincode: '',
        bankName: '',
        bankAccountNo: '',
        bankIfsc: '',
        bankAccountHolderName: '',
        bankCountry: '',
        status: 'ACTIVE'
    });

    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        fetchVendors(currentPage);
    }, [currentPage]);

    const fetchVendors = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/users', {
                params: {
                    page: page - 1, // Spring uses 0-based index
                    size: itemsPerPage,
                },
            });


            // Handle paginated response
            if (response.data.content) {
                setVendors(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
            } else {
                // Fallback if response is not paginated
                setVendors(response.data);
                setTotalPages(1);
                setTotalElements(response.data.length);
            }
        } catch (error) {
            console.error("Failed to fetch vendors:", error);
            toast({
                title: 'Error',
                description: 'Failed to fetch vendor list',
                variant: 'destructive',
            });
            setVendors([]);
            setTotalPages(0);
            setTotalElements(0);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateVendor = async (e) => {
        e.preventDefault();
        setActionLoading(true);

        try {
            const payload = {
                ...createForm,
                role: 'VENDOR',
                status: 'ACTIVE',
            };

            await axiosInstance.post('/users', payload);

            toast({
                title: 'Success',
                description: 'Vendor created successfully',
            });

            setCreateVendorOpen(false);
            setCreateForm({
                name: '',
                email: '',
                password: '',
                vendorCode: '',
                vendorType: '',
                vendorName: '',
                mobileNo: '',
                gstNo: '',
                panNo: '',
                address: '',
                city: '',
                state: '',
                region: '',
                country: '',
                pincode: '',
                bankName: '',
                bankAccountNo: '',
                bankIfsc: '',
                bankAccountHolderName: '',
                bankCountry: '',
                role: 'VENDOR',
                status: 'ACTIVE'
            });
            fetchVendors(currentPage);

        } catch (error) {
            console.error("Create error:", error);
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to create vendor',
                variant: 'destructive',
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleEditClick = (vendor) => {
        setCurrentVendor(vendor);
       
        setEditForm({
            vendorType: vendor.vendorType || '',
            vendorName: vendor.vendorName || '',
            mobileNo: vendor.mobileNo || '',
            gstNo: vendor.gstNo || '',
            panNo: vendor.panNo || '',
            address: vendor.address || '',
            city: vendor.city || '',
            state: vendor.state || '',
            region: vendor.region || '',
            country: vendor.country || '',
            pincode: vendor.pincode || '',
            bankName: vendor.bankName || '',
            bankAccountNo: vendor.bankAccountNo || '',
            bankIfsc: vendor.bankIfsc || '',
            bankAccountHolderName: vendor.bankAccountHolderName || '',
            bankCountry: vendor.bankCountry || '',
            status: vendor.status || 'ACTIVE'
        });
        setEditVendorOpen(true);
    };

    const handleViewDetails = async (vendor) => {
        try {
            
            const response = await axiosInstance.get(`/users/${vendor}`);
            setViewVendor(response.data);
            setViewDetailsOpen(true);
        } catch (error) {
            console.error("Failed to fetch vendor details:", error);
            toast({
                title: 'Error',
                description: 'Failed to load vendor details',
                variant: 'destructive',
            });
        }
    };

    const handleUpdateVendor = async (e) => {
        e.preventDefault();
        if (!currentVendor) return;

        setActionLoading(true);

        try {
            const payload = { ...editForm };

            await axiosInstance.put(`/users/${currentVendor.user}`, payload);

            toast({
                title: 'Success',
                description: 'Vendor details updated successfully',
            });

            setEditVendorOpen(false);
            setCurrentVendor(null);
            fetchVendors(currentPage);

        } catch (error) {
            console.error("Update error:", error);
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to update vendor',
                variant: 'destructive',
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

    const handleFormChange = (field, value) => {
        setCreateForm(prev => ({ ...prev, [field]: value }));
    };

    const handleEditFormChange = (field, value) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    const filteredVendors = vendors.filter(vendor =>
        vendor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.vendorCode?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
            {/* Header */}
            <div className="bg-white border-b border-amber-200 shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                Vendor Accounts
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">Manage vendor accounts and credentials</p>
                        </div>
                        <div className="flex gap-3">
                            <Dialog open={createVendorOpen} onOpenChange={setCreateVendorOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-md">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Vendor
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh]">
                                    <DialogHeader>
                                        <DialogTitle>Add New Vendor</DialogTitle>
                                        <DialogDescription>Create a new vendor account with complete details.</DialogDescription>
                                    </DialogHeader>
                                    <ScrollArea className="max-h-[70vh] pr-4">
                                        <form onSubmit={handleCreateVendor} className="space-y-6">
                                            <Tabs defaultValue="basic" className="w-full">
                                                <TabsList className="grid w-full grid-cols-4">
                                                    <TabsTrigger value="basic">Basic</TabsTrigger>
                                                    <TabsTrigger value="vendor">Vendor</TabsTrigger>
                                                    <TabsTrigger value="address">Address</TabsTrigger>
                                                    <TabsTrigger value="bank">Bank</TabsTrigger>
                                                </TabsList>

                                                <TabsContent value="basic" className="space-y-4 mt-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <Label>Name *</Label>
                                                            <Input value={createForm.name} onChange={(e) => handleFormChange('name', e.target.value)} required />
                                                        </div>
                                                        <div>
                                                            <Label>Email *</Label>
                                                            <Input type="email" value={createForm.email} onChange={(e) => handleFormChange('email', e.target.value)} required />
                                                        </div>
                                                        <div>
                                                            <Label>Password *</Label>
                                                            <Input type="text" value={createForm.password} onChange={(e) => handleFormChange('password', e.target.value)} required />
                                                        </div>
                                                        <div>
                                                            <Label>Vendor Code</Label>
                                                            <Input value={createForm.vendorCode} onChange={(e) => handleFormChange('vendorCode', e.target.value)} placeholder="e.g., VND-1001" />
                                                        </div>
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="vendor" className="space-y-4 mt-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <Label>Vendor Name</Label>
                                                            <Input value={createForm.vendorName} onChange={(e) => handleFormChange('vendorName', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>Vendor Type</Label>
                                                            <Input value={createForm.vendorType} onChange={(e) => handleFormChange('vendorType', e.target.value)} placeholder="e.g., SUPPLIER" />
                                                        </div>
                                                        <div>
                                                            <Label>Mobile Number</Label>
                                                            <Input value={createForm.mobileNo} onChange={(e) => handleFormChange('mobileNo', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>GST Number</Label>
                                                            <Input value={createForm.gstNo} onChange={(e) => handleFormChange('gstNo', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>PAN Number</Label>
                                                            <Input value={createForm.panNo} onChange={(e) => handleFormChange('panNo', e.target.value)} />
                                                        </div>
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="address" className="space-y-4 mt-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="col-span-2">
                                                            <Label>Address</Label>
                                                            <Input value={createForm.address} onChange={(e) => handleFormChange('address', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>City</Label>
                                                            <Input value={createForm.city} onChange={(e) => handleFormChange('city', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>State</Label>
                                                            <Input value={createForm.state} onChange={(e) => handleFormChange('state', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>Region</Label>
                                                            <Input value={createForm.region} onChange={(e) => handleFormChange('region', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>Country</Label>
                                                            <Input value={createForm.country} onChange={(e) => handleFormChange('country', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>Pincode</Label>
                                                            <Input value={createForm.pincode} onChange={(e) => handleFormChange('pincode', e.target.value)} />
                                                        </div>
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="bank" className="space-y-4 mt-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <Label>Bank Name</Label>
                                                            <Input value={createForm.bankName} onChange={(e) => handleFormChange('bankName', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>Account Number</Label>
                                                            <Input value={createForm.bankAccountNo} onChange={(e) => handleFormChange('bankAccountNo', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>IFSC Code</Label>
                                                            <Input value={createForm.bankIfsc} onChange={(e) => handleFormChange('bankIfsc', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>Account Holder Name</Label>
                                                            <Input value={createForm.bankAccountHolderName} onChange={(e) => handleFormChange('bankAccountHolderName', e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label>Bank Country</Label>
                                                            <Input value={createForm.bankCountry} onChange={(e) => handleFormChange('bankCountry', e.target.value)} />
                                                        </div>
                                                    </div>
                                                </TabsContent>
                                            </Tabs>

                                            <DialogFooter>
                                                <Button type="button" variant="outline" onClick={() => setCreateVendorOpen(false)}>Cancel</Button>
                                                <Button type="submit" className="bg-gradient-to-r from-amber-600 to-orange-600 text-white" disabled={actionLoading}>
                                                    {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Vendor'}
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </ScrollArea>
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
                <Card className="shadow-lg border-amber-200/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-xl">
                            All Vendors ({totalElements})
                        </CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 border-gray-300"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                            </div>
                        ) : filteredVendors.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                <p>No vendors found</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Vendor Code</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredVendors.map((vendor) => (
                                            <TableRow key={vendor.id} className="hover:bg-amber-50/50">
                                                <TableCell className="font-medium">{vendor.vendorCode}</TableCell>
                                                <TableCell>{vendor.vendorName}</TableCell>
                                                <TableCell>{vendor.email}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            vendor.status === 'ACTIVE'
                                                                ? 'bg-green-100 text-green-800 border-green-300'
                                                                : 'bg-gray-100 text-gray-800 border-gray-300'
                                                        }
                                                        variant="outline"
                                                    >
                                                        {vendor.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleViewDetails(vendor.user)}
                                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" /> View
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditClick(vendor)}
                                                        className="text-amber-600 hover:text-amber-700 hover:bg-amber-100"
                                                    >
                                                        <Pencil className="w-4 h-4 mr-1" /> Edit
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                {/* Pagination */}
                                {totalPages > 0 && (
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-amber-100">
                                        <p className="text-sm text-amber-900 font-medium bg-amber-100/50 px-3 py-1 rounded-full">
                                            Showing <span className="font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold">{Math.min(currentPage * itemsPerPage, totalElements)}</span> of <span className="font-bold">{totalElements}</span> vendors
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
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* View Details Dialog */}
            <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Vendor Details</DialogTitle>
                        <DialogDescription>Complete vendor information</DialogDescription>
                    </DialogHeader>
                    {viewVendor && (
                        <ScrollArea className="max-h-[70vh] pr-4">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <h3 className="font-semibold text-amber-900 border-b pb-2">Basic Information</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div><span className="font-medium">Name:</span> {viewVendor.name}</div>
                                        <div><span className="font-medium">Email:</span> {viewVendor.email}</div>
                                        <div><span className="font-medium">Vendor Code:</span> {viewVendor.vendorCode || '-'}</div>
                                        <div><span className="font-medium">Status:</span> {viewVendor.status}</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="font-semibold text-amber-900 border-b pb-2">Vendor Details</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div><span className="font-medium">Vendor Name:</span> {viewVendor.vendorName || '-'}</div>
                                        <div><span className="font-medium">Vendor Type:</span> {viewVendor.vendorType || '-'}</div>
                                        <div><span className="font-medium">Mobile:</span> {viewVendor.mobileNo || '-'}</div>
                                        <div><span className="font-medium">GST No:</span> {viewVendor.gstNo || '-'}</div>
                                        <div><span className="font-medium">PAN No:</span> {viewVendor.panNo || '-'}</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="font-semibold text-amber-900 border-b pb-2">Address Information</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="col-span-2"><span className="font-medium">Address:</span> {viewVendor.address || '-'}</div>
                                        <div><span className="font-medium">City:</span> {viewVendor.city || '-'}</div>
                                        <div><span className="font-medium">State:</span> {viewVendor.state || '-'}</div>
                                        <div><span className="font-medium">Region:</span> {viewVendor.region || '-'}</div>
                                        <div><span className="font-medium">Country:</span> {viewVendor.country || '-'}</div>
                                        <div><span className="font-medium">Pincode:</span> {viewVendor.pincode || '-'}</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="font-semibold text-amber-900 border-b pb-2">Bank Details</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div><span className="font-medium">Bank Name:</span> {viewVendor.bankName || '-'}</div>
                                        <div><span className="font-medium">Account No:</span> {viewVendor.bankAccountNo || '-'}</div>
                                        <div><span className="font-medium">IFSC:</span> {viewVendor.bankIfsc || '-'}</div>
                                        <div><span className="font-medium">Holder Name:</span> {viewVendor.bankAccountHolderName || '-'}</div>
                                        <div><span className="font-medium">Country:</span> {viewVendor.bankCountry || '-'}</div>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    )}
                </DialogContent>
            </Dialog>

            {/* Edit Vendor Dialog */}
            <Dialog open={editVendorOpen} onOpenChange={setEditVendorOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Edit Vendor Details</DialogTitle>
                        <DialogDescription>Update vendor information (Email and Vendor Code cannot be changed)</DialogDescription>
                    </DialogHeader>
                    {currentVendor && (
                        <ScrollArea className="max-h-[70vh] pr-4">
                            <form onSubmit={handleUpdateVendor} className="space-y-6">
                                <Tabs defaultValue="vendor" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="vendor">Vendor</TabsTrigger>
                                        <TabsTrigger value="address">Address</TabsTrigger>
                                        <TabsTrigger value="bank">Bank</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="vendor" className="space-y-4 mt-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Vendor Name</Label>
                                                <Input value={editForm.vendorName} onChange={(e) => handleEditFormChange('vendorName', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>Vendor Type</Label>
                                                <Input value={editForm.vendorType} onChange={(e) => handleEditFormChange('vendorType', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>Mobile Number</Label>
                                                <Input value={editForm.mobileNo} onChange={(e) => handleEditFormChange('mobileNo', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>GST Number</Label>
                                                <Input value={editForm.gstNo} onChange={(e) => handleEditFormChange('gstNo', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>PAN Number</Label>
                                                <Input value={editForm.panNo} onChange={(e) => handleEditFormChange('panNo', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>Status</Label>
                                                <Select value={editForm.status} onValueChange={(value) => handleEditFormChange('status', value)}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="address" className="space-y-4 mt-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <Label>Address</Label>
                                                <Input value={editForm.address} onChange={(e) => handleEditFormChange('address', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>City</Label>
                                                <Input value={editForm.city} onChange={(e) => handleEditFormChange('city', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>State</Label>
                                                <Input value={editForm.state} onChange={(e) => handleEditFormChange('state', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>Region</Label>
                                                <Input value={editForm.region} onChange={(e) => handleEditFormChange('region', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>Country</Label>
                                                <Input value={editForm.country} onChange={(e) => handleEditFormChange('country', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>Pincode</Label>
                                                <Input value={editForm.pincode} onChange={(e) => handleEditFormChange('pincode', e.target.value)} />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="bank" className="space-y-4 mt-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Bank Name</Label>
                                                <Input value={editForm.bankName} onChange={(e) => handleEditFormChange('bankName', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>Account Number</Label>
                                                <Input value={editForm.bankAccountNo} onChange={(e) => handleEditFormChange('bankAccountNo', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>IFSC Code</Label>
                                                <Input value={editForm.bankIfsc} onChange={(e) => handleEditFormChange('bankIfsc', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>Account Holder Name</Label>
                                                <Input value={editForm.bankAccountHolderName} onChange={(e) => handleEditFormChange('bankAccountHolderName', e.target.value)} />
                                            </div>
                                            <div>
                                                <Label>Bank Country</Label>
                                                <Input value={editForm.bankCountry} onChange={(e) => handleEditFormChange('bankCountry', e.target.value)} />
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setEditVendorOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="bg-gradient-to-r from-amber-600 to-orange-600 text-white" disabled={actionLoading}>
                                        {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </ScrollArea>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default VendorAccounts;
