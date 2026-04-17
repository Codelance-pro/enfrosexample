import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import vendorAxios from '@/config/vendorAxios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, FileText, Upload, Plus, Download, Image as ImageIcon, User, Save } from 'lucide-react';
import { uploadToCloudinary } from '@/lib/cloudinary';
import logo2 from "../assets/enfros-logo.png";

const VendorDashboard = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState(null);
    const [bills, setBills] = useState([]);
    const [loadingBills, setLoadingBills] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const itemsPerPage = 10;

    // Profile State
    const [profileData, setProfileData] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [profileForm, setProfileForm] = useState({
        // name: '',
        // password: '',
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
        bankCountry: ''
    });

    // Form State
    const [billForm, setBillForm] = useState({
        productName: '',
        billNumber: '',
        projectNumber: '',
        projectCode: '',
        poNumber: '',
        amount: '',
        // billImage: '',
        billPdfUrl: ''
    });
    const [imagePreview, setImagePreview] = useState(null);


    useEffect(() => {
        const storedUser = localStorage.getItem('vendorUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/vendor/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (user?.id) {
            fetchMyBills(user.id, currentPage);
            fetchProfile(user.id);
        }
    }, [user, currentPage]);

    const fetchMyBills = async (vendorId, page = 1) => {
        setLoadingBills(true);

        try {
            const response = await vendorAxios.get(`/vendor/purchase/${vendorId}/bills`, {
                params: {
                    page: page - 1, // Spring uses 0-based index
                    size: itemsPerPage
                }
            });
            console.log("Bills Data:", response.data);

            if (response.data.content) {
                setBills(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
            } else {
                setBills([]);
                setTotalPages(0);
                setTotalElements(0);
            }
        } catch (error) {
            console.error("Failed to fetch bills:", error);
            // Don't show error toast on initial load if empty, just log it
        } finally {
            setLoadingBills(false);
        }
    };

    const fetchProfile = async (vendorId) => {
        setLoadingProfile(true);
        try {
            const response = await vendorAxios.get(`/users/${vendorId}`);
            const data = response.data;
            setProfileData(data);

            // Populate form with fetched data
            setProfileForm({
                // name: data.name || '',
                // password: '', 
                vendorType: data.vendorType || '',
                vendorName: data.vendorName || '',
                mobileNo: data.mobileNo || '',
                gstNo: data.gstNo || '',
                panNo: data.panNo || '',
                address: data.address || '',
                city: data.city || '',
                state: data.state || '',
                region: data.region || '',
                country: data.country || '',
                pincode: data.pincode || '',
                bankName: data.bankName || '',
                bankAccountNo: data.bankAccountNo || '',
                bankIfsc: data.bankIfsc || '',
                bankAccountHolderName: data.bankAccountHolderName || '',
                bankCountry: data.bankCountry || ''
            });
        } catch (error) {
            console.error("Failed to fetch profile:", error);
            toast({
                title: 'Error',
                description: 'Failed to load profile data',
                variant: 'destructive',
            });
        } finally {
            setLoadingProfile(false);
        }
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!user?.id) return;

        setUpdatingProfile(true);
        try {
            // Only send fields that can be updated (exclude email and vendorCode)
            const updatePayload = { ...profileForm };

            // Remove password if it's empty (user doesn't want to change it)
            if (!updatePayload.password || updatePayload.password.trim() === '') {
                delete updatePayload.password;
            }

            await vendorAxios.put(`/users/${user.id}`, updatePayload);

            toast({
                title: 'Success',
                description: 'Profile updated successfully!',

            });

            // Refresh profile data
            fetchProfile(user.id);

            // Update local storage if name changed
            // if (updatePayload.name) {
            //     const updatedUser = { ...user, name: updatePayload.name };
            //     setUser(updatedUser);
            //     localStorage.setItem('vendorUser', JSON.stringify(updatedUser));
            // }

        } catch (error) {
            console.error('Update error:', error);
            toast({
                title: 'Update Failed',
                description: error.response?.data?.message || 'Failed to update profile.',
                variant: 'destructive',
            });
        } finally {
            setUpdatingProfile(false);
        }
    };

    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'billImage') {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    // Just for preview
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setBillForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmitBill = async (e) => {
        e.preventDefault();
        if (!user?.id) return;

        setSubmitting(true);
        try {
            // let imageUrl = '';
            // const fileInput = document.getElementById('billImage');
            // const file = fileInput?.files[0];
            // if (file) {
            //     imageUrl = await uploadToCloudinary(file);
            // }

            const pdfInput = document.getElementById('billPdf');
            const pdfFile = pdfInput?.files[0];


            const model = {
                ...billForm,
                // billImage: imageUrl,
                vendorId: user.id
            };

            const formData = new FormData();
            formData.append("data", new Blob([JSON.stringify(model)], { type: "application/json" }));

            if (pdfFile) {
                formData.append("file", pdfFile);
            }



            await vendorAxios.post('/vendor/purchase', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast({
                title: 'Success',
                description: 'Bill submitted successfully!',
            });

            // Reset form
            setBillForm({
                productName: '',
                billNumber: '',
                projectNumber: '',
                projectCode: '',
                poNumber: '',
                amount: '',
                billImage: '',
                billPdf: ''
            });
            setImagePreview(null);

            // Reset file input manually
            // if (fileInput) fileInput.value = '';
            if (pdfInput) pdfInput.value = '';

            // Refresh bills
            fetchMyBills(user.id, currentPage);

        } catch (error) {
            console.error('Submit error:', error);
            toast({
                title: 'Submission Failed',
                description: error.message || error.response?.data?.message || 'Failed to submit bill.',
                variant: 'destructive',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('vendorToken');
        localStorage.removeItem('vendorUser');
        navigate('/vendor/login');
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


    const downloadBill = async (purchaseId) => {
        const response = await vendorAxios.get(
            `/vendor/purchase/download/${purchaseId}`,
            {
                responseType: "blob", // 🔴 THIS IS REQUIRED
            }
        );

        const blob = new Blob([response.data], {
            type: "application/pdf",
        });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `bill_${purchaseId}.pdf`;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const deleteBill = async (purchaseId) => {
        try {

            await vendorAxios.delete(`/vendor/purchase/${purchaseId}`);
            toast({
                title: 'Success',
                description: 'Bill deleted successfully!',
            });
            fetchMyBills(user.id, currentPage);
        } catch (error) {
            console.error('Error deleting bill:', error);

            const backendMessage =
                error?.response?.data?.message ||
                error?.response?.data ||
                'Failed to delete bill';
            toast({
                title: 'Error',
                description: backendMessage,
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-amber-200 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="">
                            {/* <FileText className="w-5 h-5 text-white" /> */}
                            <img
                                src={logo2}
                                alt="Logo"
                                className="h-20 w-60 p-2  hover:scale-105 transition-transform"
                            />
                        </div>
                       
                    </div>

                    <h1 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-800 bg-clip-text text-transparent">
                        Vendor Portal
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="text-sm text-right hidden sm:block">
                            <h1 className="font-semibold text-gray-800 ">Welcome back, {profileData?.vendorName || 'Vendor'}</h1>
                            {/* <p className="text-gray-500 text-xs">{profileData?.email}</p> */}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleLogout}
                            className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Tabs defaultValue="submit" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 max-w-[600px] bg-amber-100/50 mx-auto">
                        <TabsTrigger
                            value="submit"
                            className="data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm"
                        >
                            Submit New Bill
                        </TabsTrigger>
                        <TabsTrigger
                            value="history"
                            className="data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm"
                        >
                            My Bills History
                        </TabsTrigger>
                        <TabsTrigger
                            value="profile"
                            className="data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm"
                        >
                            My Profile
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="submit" className="space-y-4">
                        <Card className="max-w-2xl border-amber-200/50 shadow-lg mx-auto">
                            <CardHeader>
                                <CardTitle className="text-amber-900">Submit Bill Details</CardTitle>
                                <CardDescription>
                                    Upload your bill invoice and details for admin approval.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmitBill} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="productName">Product/Service Name</Label>
                                            <Input
                                                id="productName"
                                                name="productName"
                                                placeholder="e.g. Solar Panel Installation"
                                                value={billForm.productName}
                                                onChange={handleFormChange}
                                                required
                                                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="billNumber">Bill/Invoice Number</Label>
                                            <Input
                                                id="billNumber"
                                                name="billNumber"
                                                placeholder="INV-2024-001"
                                                value={billForm.billNumber}
                                                onChange={handleFormChange}
                                                required
                                                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="projectNumber">Project Number</Label>
                                            <Input
                                                id="projectNumber"
                                                name="projectNumber"
                                                placeholder="PRJ-001"
                                                value={billForm.projectNumber}
                                                onChange={handleFormChange}
                                                required
                                                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="projectCode">Project Code</Label>
                                            <Input
                                                id="projectCode"
                                                name="projectCode"
                                                placeholder="PC-123"
                                                value={billForm.projectCode}
                                                onChange={handleFormChange}
                                                required
                                                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="poNumber">PO Number</Label>
                                            <Input
                                                id="poNumber"
                                                name="poNumber"
                                                placeholder="PO-456"
                                                value={billForm.poNumber}
                                                onChange={handleFormChange}
                                                required
                                                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="amount">Amount (₹)</Label>
                                            <Input
                                                id="amount"
                                                name="amount"
                                                type="number"
                                                placeholder="0.00"
                                                value={billForm.amount}
                                                onChange={handleFormChange}
                                                required

                                                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                                            />
                                        </div>
                                        {/* 
                                        <div className="space-y-2">
                                            <Label htmlFor="billImage">Upload Invoice Image</Label>
                                            <div className="space-y-3">
                                                <Input
                                                    id="billImage"
                                                    name="billImage"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFormChange}
                                                    required
                                                    className="cursor-pointer border-amber-200 file:bg-amber-100 file:text-amber-700 file:border-0 file:mr-4 file:py-1 file:px-3 file:rounded-full hover:file:bg-amber-200"
                                                />
                                                {imagePreview && (
                                                    <div className="relative rounded-lg overflow-hidden border border-amber-200 shadow-sm group">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-full h-48 object-contain bg-slate-50"
                                                        />
                                                        <div className="absolute inset-x-0 bottom-0 bg-black/50 p-2 text-white text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            Preview
                                                        </div>
                                                    </div>
                                                )}
                                                {!imagePreview && (
                                                    <div className="h-48 border-2 border-dashed border-amber-200 rounded-lg flex flex-col items-center justify-center text-amber-400 bg-amber-50/50">
                                                        <ImageIcon className="w-8 h-8 mb-2" />
                                                        <span className="text-sm">No image selected</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div> */}


                                        <div className="space-y-2">
                                            <Label htmlFor="billPdf">Upload PDF</Label>
                                            <Input
                                                id="billPdf"
                                                name="billPdf"
                                                type="file"
                                                accept="application/pdf"
                                                onChange={handleFormChange}
                                                className="cursor-pointer border-amber-200 file:bg-amber-100 file:text-amber-700 file:border-0 file:mr-4 file:py-1 file:px-3 file:rounded-full hover:file:bg-amber-200"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all"
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Submit Bill
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="history">
                        <Card className="border-amber-200/50 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-amber-900">Submitted Bills</CardTitle>
                                <CardDescription>
                                    Track the status of your submitted bills.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {loadingBills ? (
                                    <div className="flex justify-center p-8">
                                        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                                    </div>
                                ) : bills.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">
                                        <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                        <p>No bills submitted yet.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Bill #</TableHead>
                                                    <TableHead>Product</TableHead>
                                                    <TableHead>Project #</TableHead>
                                                    <TableHead>Project Code</TableHead>
                                                    <TableHead>PO #</TableHead>
                                                    <TableHead>CreatedDate</TableHead>
                                                    <TableHead>ReviewDate</TableHead>
                                                    <TableHead>Amount</TableHead>
                                                    {/* <TableHead>Image</TableHead> */}
                                                    <TableHead>PDF</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Remark</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {bills.map((bill) => (
                                                    <TableRow key={bill.id} className="hover:bg-amber-50/50">
                                                        <TableCell className="font-medium">{bill.billNumber}</TableCell>
                                                        <TableCell>{bill.productName}</TableCell>
                                                        <TableCell>{bill.projectNumber || '-'}</TableCell>
                                                        <TableCell>{bill.projectCode || '-'}</TableCell>
                                                        <TableCell>{bill.poNumber || '-'}</TableCell>
                                                        <TableCell>{bill.createdAt ? new Date(bill.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                                                        <TableCell>{bill.reviewedAt ? new Date(bill.reviewedAt).toLocaleDateString() : 'N/A'}</TableCell>
                                                        <TableCell>₹{Number(bill.amount).toLocaleString()}</TableCell>
                                                        {/* <TableCell>
                                                            <img
                                                                src={bill.billImage}
                                                                alt="Bill Image"
                                                                className="w-16 h-16 object-cover"
                                                            />
                                                        </TableCell> */}
                                                        <TableCell>
                                                            {bill.billPdfUrl ? (
                                                                <button
                                                                    onClick={() => downloadBill(bill.id)}
                                                                    className="text-amber-600 hover:underline flex items-center gap-1"
                                                                >
                                                                    <FileText className="w-4 h-4" />
                                                                    <span className="text-xs">Download</span>
                                                                </button>
                                                            ) : (
                                                                <span className="text-gray-400">-</span>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>{getStatusBadge(bill.status)}</TableCell>
                                                        <TableCell className="max-w-xs truncate text-gray-500">
                                                            {bill.adminRemark || '-'}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => deleteBill(bill.id)}
                                                                className="bg-amber-600 hover:bg-amber-700 text-white"
                                                            >
                                                                Delete
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>

                                        {/* Pagination Controls */}
                                        {totalPages > 0 && (
                                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-amber-100">
                                                <p className="text-sm text-gray-600">
                                                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalElements)}</span> of <span className="font-medium">{totalElements}</span> bills
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        disabled={currentPage === 1}
                                                        onClick={() => setCurrentPage(prev => prev - 1)}
                                                        className="border-amber-200 hover:bg-amber-50 text-amber-700"
                                                    >
                                                        Previous
                                                    </Button>

                                                    <div className="flex items-center gap-1 mx-2">
                                                        {[...Array(totalPages)].map((_, index) => {
                                                            const page = index + 1;
                                                            // Logic for ellipsis and page numbers remains similar to other implementations
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
                                                                        className={`w-8 h-8 p-0 ${page === currentPage
                                                                            ? "bg-amber-600 hover:bg-amber-700 text-white border-none"
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
                                                                return <span key={page} className="px-1 text-gray-400">...</span>;
                                                            }
                                                            return null;
                                                        })}
                                                    </div>

                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        disabled={currentPage === totalPages}
                                                        onClick={() => setCurrentPage(prev => prev + 1)}
                                                        className="border-amber-200 hover:bg-amber-50 text-amber-700"
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
                    </TabsContent>

                    <TabsContent value="profile">
                        <Card className="border-amber-200/50 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-amber-900 flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    My Profile
                                </CardTitle>
                                <CardDescription>
                                    View and update your vendor profile information
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {loadingProfile ? (
                                    <div className="flex justify-center p-8">
                                        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                                    </div>
                                ) : (
                                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                                        {/* Basic Information */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-amber-900 border-b border-amber-200 pb-2">
                                                Basic Information
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* <div className="space-y-2">
                                                    <Label htmlFor="name">Name *</Label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        value={profileForm.name}
                                                        onChange={handleProfileChange}
                                                        required
                                                        className="border-amber-200"
                                                    />
                                                </div> */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email (Read-only)</Label>
                                                    <Input
                                                        id="email"
                                                        value={profileData?.email || ''}
                                                        disabled
                                                        className="bg-gray-100 cursor-not-allowed"
                                                    />
                                                </div>
                                                {/* <div className="space-y-2">
                                                    <Label htmlFor="password">New Password (Optional)</Label>
                                                    <Input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        value={profileForm.password}
                                                        onChange={handleProfileChange}
                                                        placeholder="Leave blank to keep current"
                                                        className="border-amber-200"
                                                    />
                                                </div> */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="vendorCode">Vendor Code (Read-only)</Label>
                                                    <Input
                                                        id="vendorCode"
                                                        value={profileData?.vendorCode || ''}
                                                        disabled
                                                        className="bg-gray-100 cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Vendor Details */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-amber-900 border-b border-amber-200 pb-2">
                                                Vendor Details
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="vendorName">Vendor Name</Label>
                                                    <Input
                                                        id="vendorName"
                                                        name="vendorName"
                                                        value={profileForm.vendorName}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="vendorType">Vendor Type</Label>
                                                    <Input
                                                        id="vendorType"
                                                        name="vendorType"
                                                        disabled
                                                        value={profileForm.vendorType}
                                                        onChange={handleProfileChange}
                                                        placeholder="e.g., SUPPLIER"
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="mobileNo">Mobile Number</Label>
                                                    <Input
                                                        id="mobileNo"
                                                        name="mobileNo"
                                                        value={profileForm.mobileNo}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="gstNo">GST Number</Label>
                                                    <Input
                                                        id="gstNo"
                                                        name="gstNo"
                                                        disabled
                                                        value={profileForm.gstNo}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="panNo">PAN Number</Label>
                                                    <Input
                                                        id="panNo"
                                                        name="panNo"
                                                        disabled
                                                        value={profileForm.panNo}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Address Information */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-amber-900 border-b border-amber-200 pb-2">
                                                Address Information
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label htmlFor="address">Address</Label>
                                                    <Input
                                                        id="address"
                                                        name="address"
                                                        value={profileForm.address}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="city">City</Label>
                                                    <Input
                                                        id="city"
                                                        name="city"
                                                        value={profileForm.city}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="state">State</Label>
                                                    <Input
                                                        id="state"
                                                        name="state"
                                                        value={profileForm.state}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="region">Region</Label>
                                                    <Input
                                                        id="region"
                                                        name="region"
                                                        value={profileForm.region}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="country">Country</Label>
                                                    <Input
                                                        id="country"
                                                        name="country"
                                                        value={profileForm.country}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="pincode">Pincode</Label>
                                                    <Input
                                                        id="pincode"
                                                        name="pincode"
                                                        value={profileForm.pincode}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bank Details */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-amber-900 border-b border-amber-200 pb-2">
                                                Bank Details
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="bankName">Bank Name</Label>
                                                    <Input
                                                        id="bankName"
                                                        name="bankName"
                                                        disabled
                                                        value={profileForm.bankName}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="bankAccountNo">Account Number</Label>
                                                    <Input
                                                        id="bankAccountNo"
                                                        name="bankAccountNo"
                                                        disabled
                                                        value={profileForm.bankAccountNo}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="bankIfsc">IFSC Code</Label>
                                                    <Input
                                                        id="bankIfsc"
                                                        name="bankIfsc"
                                                        disabled
                                                        value={profileForm.bankIfsc}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="bankAccountHolderName">Account Holder Name</Label>
                                                    <Input
                                                        id="bankAccountHolderName"
                                                        name="bankAccountHolderName"
                                                        disabled
                                                        value={profileForm.bankAccountHolderName}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="bankCountry">Bank Country</Label>
                                                    <Input
                                                        id="bankCountry"
                                                        name="bankCountry"
                                                        disabled
                                                        value={profileForm.bankCountry}
                                                        onChange={handleProfileChange}
                                                        className="border-amber-200"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <Button
                                                type="submit"
                                                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md"
                                                disabled={updatingProfile}
                                            >
                                                {updatingProfile ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Updating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="mr-2 h-4 w-4" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div >
    );
};

export default VendorDashboard;
