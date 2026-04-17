import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import vendorAxios from '@/config/vendorAxios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock, Mail, Building2 } from 'lucide-react';

const VendorLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Using the same auth endpoint, assuming it handles role-based login
            const response = await vendorAxios.post('/auth/login', formData);
            console.log(response.data);
            // Check if user is actually a vendor (safety check if the backend doesn't restrict)
            if (response.data.role !== 'VENDOR') {
                // Fallback if role is in different place, adjust as needed based on actual API response
                // For now, assume if login works, we check role.
                // If the backend returns a generic token, we might need to verify role here.
                // If backend doesn't return role in expected format, this might block valid users.
                // I will assume response.data.user.role exists as per common patterns or response.data.role

                const role = response.data.role;
                if (role !== 'VENDOR') {
                    throw new Error('Unauthorized access. This portal is for vendors only.');
                }
            }

            // Store token and user data
            localStorage.setItem('vendorToken', response.data.token);
            localStorage.setItem('vendorUser', JSON.stringify(response.data.user || response.data));

            toast({
                title: 'Login Successful',
                description: 'Welcome back!',
            });

            // Redirect to vendor dashboard
            window.location.hash = '#/vendor/dashboard';
        } catch (error) {
            console.error(error);
            toast({
                title: 'Login Failed',
                description: error.response?.data?.message || error.message || 'Invalid credentials. Please try again.',
                variant: 'destructive',
            });
            window.location.hash = '#/vendor/login';
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.1),transparent_50%)]" />

            <Card className="w-full max-w-md relative z-10 shadow-2xl border-amber-200/50 backdrop-blur-sm bg-white/95">
                <CardHeader className="space-y-3 text-center pb-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Vendor Portal
                    </CardTitle>
                    <CardDescription className="text-base">
                        Sign in to submit and track your bills
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="vendor@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 h-11 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 h-11 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link to="/" className="text-sm text-gray-600">
                            <span className="text-amber-600 hover:underline">Back to Home</span>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default VendorLogin;
