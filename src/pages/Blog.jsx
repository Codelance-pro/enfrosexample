import { useState } from "react";
import { Calendar, User, Clock, ArrowRight, Sun, Zap, TrendingUp, Home, Search, Award, Heart, MessageCircle, Share2, ChevronRight, Sparkles, Star, X } from "lucide-react";

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [likedPosts, setLikedPosts] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = [
        { id: "all", name: "All Articles", icon: Sun },
        { id: "savings", name: "Savings & ROI", icon: TrendingUp },
        { id: "technology", name: "Technology", icon: Zap },
        { id: "installation", name: "Installation", icon: Home },
        { id: "guides", name: "Guides", icon: Award }
    ];

    // Header carousel images
    const headerImages = [
        {
            id: 1,
            url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=400&fit=crop",
            title: "Solar Panel Installation",
            subtitle: "Professional rooftop solutions"
        },
        {
            id: 2,
            url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=400&fit=crop",
            title: "Solar Farm Technology",
            subtitle: "Large-scale renewable energy"
        },
        {
            id: 3,
            url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&h=400&fit=crop",
            title: "Clean Energy Future",
            subtitle: "Sustainable power generation"
        },
        {
            id: 4,
            url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=400&fit=crop",
            title: "Commercial Solar",
            subtitle: "Business energy solutions"
        },
        {
            id: 5,
            url: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1200&h=400&fit=crop",
            title: "Residential Solar",
            subtitle: "Home energy independence"
        },
        {
            id: 6,
            url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=400&fit=crop",
            title: "Solar Innovation",
            subtitle: "Next-gen technology"
        }
    ];

    const featuredPost = {
        id: 0,
        title: "The Ultimate Guide to Going Solar in India 2024",
        excerpt: "Everything you need to know about solar energy - from choosing the right panels to maximizing government subsidies. Your complete roadmap to energy independence starts here.",
        category: "guides",
        author: "Dr. Sunita Reddy",
        date: "Dec 18, 2024",
        readTime: "15 min read",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=600&fit=crop",
        featured: true,
        views: "12.5K",
        likes: 342
    };

    const blogPosts = [
        {
            id: 1,
            title: "Complete Guide to Solar Panel Installation in India 2024",
            excerpt: "Everything you need to know about installing solar panels on your rooftop. From permits to maintenance, we cover it all in this comprehensive guide.",
            category: "installation",
            author: "Rajesh Kumar",
            date: "Dec 15, 2024",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop",
            views: "8.2K",
            likes: 156
        },
        {
            id: 2,
            title: "How to Save ₹50,000 Annually with Solar Energy",
            excerpt: "Discover proven strategies to maximize your solar savings. Real case studies from homeowners who reduced their electricity bills to zero.",
            category: "savings",
            author: "Priya Sharma",
            date: "Dec 12, 2024",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&h=500&fit=crop",
            views: "6.8K",
            likes: 203
        },
        {
            id: 3,
            title: "Understanding Net Metering: Sell Power Back to the Grid",
            excerpt: "Learn how net metering works in India and how you can earn money by selling excess solar power back to your electricity provider.",
            category: "savings",
            author: "Amit Patel",
            date: "Dec 10, 2024",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop",
            views: "5.4K",
            likes: 127
        },
        {
            id: 4,
            title: "Latest Solar Panel Technology: Bifacial vs Monocrystalline",
            excerpt: "Compare the latest solar panel technologies and find out which type offers the best efficiency and value for your home in 2024.",
            category: "technology",
            author: "Dr. Sunita Reddy",
            date: "Dec 8, 2024",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=500&fit=crop",
            views: "7.1K",
            likes: 189
        },
        {
            id: 5,
            title: "Government Subsidies for Solar: Complete State-wise Guide",
            excerpt: "Navigate through central and state government subsidies. Learn how to claim up to ₹78,000 in subsidies for your residential solar system.",
            category: "savings",
            author: "Vikram Singh",
            date: "Dec 5, 2024",
            readTime: "10 min read",
            image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=500&fit=crop",
            views: "9.3K",
            likes: 267
        },
        {
            id: 6,
            title: "Solar Battery Storage: Is It Worth the Investment?",
            excerpt: "Explore the pros and cons of adding battery storage to your solar system. Calculate the ROI and understand when batteries make sense.",
            category: "technology",
            author: "Meera Iyer",
            date: "Dec 3, 2024",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&h=500&fit=crop",
            views: "4.9K",
            likes: 134
        },
        {
            id: 7,
            title: "Rooftop Solar Maintenance: Essential Tips for Longevity",
            excerpt: "Keep your solar panels running at peak efficiency. Learn the best maintenance practices to ensure 25+ years of reliable performance.",
            category: "installation",
            author: "Arjun Menon",
            date: "Dec 1, 2024",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop",
            views: "3.7K",
            likes: 98
        },
        {
            id: 8,
            title: "Solar Power for Commercial Buildings: A Business Case",
            excerpt: "Reduce operational costs and improve your company's sustainability. See how businesses are saving millions with commercial solar installations.",
            category: "savings",
            author: "Kavita Desai",
            date: "Nov 28, 2024",
            readTime: "9 min read",
            image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=500&fit=crop",
            views: "6.2K",
            likes: 176
        },
        {
            id: 9,
            title: "Solar Inverter Guide: String vs Micro vs Hybrid",
            excerpt: "Choosing the right inverter is crucial for your solar system's performance. Compare different types and find the best fit for your needs.",
            category: "technology",
            author: "Rajesh Kumar",
            date: "Nov 25, 2024",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=500&fit=crop",
            views: "5.8K",
            likes: 145
        },
        {
            id: 10,
            title: "How to Choose the Right Solar Installer",
            excerpt: "Not all solar companies are created equal. Learn the key questions to ask and red flags to watch out for when selecting your installer.",
            category: "guides",
            author: "Priya Sharma",
            date: "Nov 22, 2024",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop",
            views: "4.5K",
            likes: 112
        },
        {
            id: 11,
            title: "Solar Energy Myths Debunked: Facts vs Fiction",
            excerpt: "Separate fact from fiction with our myth-busting guide. We tackle the most common misconceptions about solar energy in India.",
            category: "guides",
            author: "Amit Patel",
            date: "Nov 20, 2024",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&h=500&fit=crop",
            views: "7.6K",
            likes: 221
        },
        {
            id: 12,
            title: "Tax Benefits and Depreciation on Solar Systems",
            excerpt: "Maximize your savings with tax benefits. Learn about depreciation, deductions, and how to leverage them for your solar investment.",
            category: "savings",
            author: "Vikram Singh",
            date: "Nov 18, 2024",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop",
            views: "3.9K",
            likes: 87
        }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleLike = (postId) => {
        setLikedPosts(prev =>
            prev.includes(postId)
                ? prev.filter(id => id !== postId)
                : [...prev, postId]
        );
    };

    const openArticle = (article) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedArticle(null), 300);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 pt-20">
            {/* Article Modal */}
            {isModalOpen && selectedArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 z-30 bg-white/90 hover:bg-red-500 text-gray-700 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* Article Header Image */}
                        <div className="relative h-80 overflow-hidden">
                            <img
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                            {/* Category Badge */}
                            <div className="absolute top-6 left-6">
                                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                    {selectedArticle.category.toUpperCase()}
                                </span>
                            </div>

                            {/* Title Overlay */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                                    {selectedArticle.title}
                                </h2>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="overflow-y-auto max-h-[calc(90vh-320px)] p-8">
                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <User className="h-5 w-5 text-yellow-600" />
                                    <span className="text-gray-700 font-medium">{selectedArticle.author}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-5 w-5 text-yellow-600" />
                                    <span className="text-gray-600">{selectedArticle.date}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-5 w-5 text-yellow-600" />
                                    <span className="text-gray-600">{selectedArticle.readTime}</span>
                                </div>
                                <div className="flex items-center space-x-4 ml-auto">
                                    <button
                                        onClick={() => toggleLike(selectedArticle.id)}
                                        className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                                    >
                                        <Heart className={`h-5 w-5 ${likedPosts.includes(selectedArticle.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                        <span>{selectedArticle.likes}</span>
                                    </button>
                                    <div className="flex items-center space-x-1 text-gray-600">
                                        <MessageCircle className="h-5 w-5" />
                                        <span>{selectedArticle.views}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Article Excerpt */}
                            <div className="mb-8">
                                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                                    {selectedArticle.excerpt}
                                </p>
                            </div>

                            {/* Full Article Content */}
                            <div className="prose prose-lg max-w-none">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h3>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    Solar energy has revolutionized the way we think about power generation. As we move towards a more sustainable future, understanding the fundamentals of solar technology becomes increasingly important. This comprehensive guide will walk you through everything you need to know about solar energy systems.
                                </p>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h3>
                                <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                                    <li>Significant reduction in electricity bills (up to 70%)</li>
                                    <li>Low maintenance costs over 25+ year lifespan</li>
                                    <li>Increase in property value by 3-4%</li>
                                    <li>Environmental benefits and carbon footprint reduction</li>
                                    <li>Energy independence and protection from rising costs</li>
                                    <li>Government subsidies and tax incentives available</li>
                                </ul>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Implementation Strategy</h3>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    The implementation of a solar energy system requires careful planning and consideration of various factors. From assessing your energy needs to selecting the right equipment and installer, each step plays a crucial role in ensuring optimal performance and return on investment.
                                </p>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Specifications</h3>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    Modern solar panels typically offer efficiency ratings between 18-22%, with premium models reaching up to 24%. The choice between monocrystalline and polycrystalline panels depends on your specific requirements, available space, and budget constraints. Inverter selection is equally important, with string inverters, micro-inverters, and hybrid systems each offering distinct advantages.
                                </p>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h3>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    Investing in solar energy is not just an environmental decision—it's a smart financial move that pays dividends for decades. With proper planning, quality equipment, and professional installation, you can enjoy clean, renewable energy while significantly reducing your electricity costs.
                                </p>
                            </div>

                            {/* Share Section */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-lg font-bold text-gray-900">Share this article</h4>
                                    <div className="flex items-center space-x-3">
                                        <button className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors">
                                            <Share2 className="h-5 w-5" />
                                        </button>
                                        <button className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors">
                                            <MessageCircle className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
            `}</style>
            {/* Full-Size Scrollable Header Images */}
            <div className="relative h-[600px] overflow-hidden shadow-2xl">
                {/* Title Overlay */}
                <div className="absolute top-12 left-0 right-0 z-20 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
                        Solar Energy Blog
                    </h1>
                    <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto drop-shadow-lg">
                        Discover insights, tips, and success stories from the world of solar energy
                    </p>
                </div>

                {/* Horizontal Scrollable Full-Size Images */}
                <div className="flex overflow-x-auto h-full scrollbar-hide snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {headerImages.map((image, index) => (
                        <div
                            key={image.id}
                            className="flex-shrink-0 w-full h-full snap-center group cursor-pointer relative"
                        >
                            <img
                                src={image.url}
                                alt={image.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>

                            {/* Image Info */}
                            <div className="absolute bottom-16 left-8 right-8 text-white z-10">
                                <div className="max-w-4xl mx-auto text-center">
                                    <h3 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">{image.title}</h3>
                                    <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">{image.subtitle}</p>
                                </div>
                            </div>

                            {/* Badge */}
                            <div className="absolute top-12 right-8 z-10">
                                <div className="bg-yellow-500/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2 shadow-xl">
                                    <Sun className="h-6 w-6 text-white" />
                                    <span className="text-white font-bold">Featured</span>
                                </div>
                            </div>

                            {/* Image Counter */}
                            <div className="absolute top-12 left-8 z-10">
                                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-bold shadow-xl">
                                    {index + 1} / {headerImages.length}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll Indicator - Bottom Center */}
                <div className="absolute bottom-6 left-0 right-0 z-20">
                    <div className="flex items-center justify-center gap-3">
                        <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center space-x-2 shadow-xl">
                            <ChevronRight className="h-5 w-5 text-white animate-pulse" />
                            <span className="text-white font-semibold">Scroll to explore</span>
                            <ChevronRight className="h-5 w-5 text-white animate-pulse" />
                        </div>
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {headerImages.map((_, index) => (
                            <div
                                key={index}
                                className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-all duration-300 cursor-pointer"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

            <div className="container mx-auto px-4 py-12">
                {/* Search and Filter Section */}
                <div className="max-w-6xl mx-auto mb-12 animate-slide-up">
                    {/* Search Bar with Icon Animation */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-4 border-yellow-300 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-yellow-500 animate-pulse" />
                            <input
                                type="text"
                                placeholder="Search for solar insights, guides, and tips..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-4 py-5 border-2 border-yellow-200 rounded-xl focus:outline-none focus:border-yellow-500 transition text-lg"
                            />
                        </div>
                    </div>

                    {/* Category Filter with Staggered Animation */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${selectedCategory === category.id
                                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-xl scale-105"
                                        : "bg-white text-gray-700 hover:bg-yellow-100 border-2 border-yellow-300 shadow-md"
                                        }`}
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        animation: "bounceIn 0.6s ease-out forwards"
                                    }}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{category.name}</span>
                                    {selectedCategory === category.id && (
                                        <ChevronRight className="h-4 w-4 animate-bounce-horizontal" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Featured Post - Hero Style */}
                <div className="max-w-6xl mx-auto mb-16 animate-slide-up">
                    <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400 group hover:border-orange-400 transition-all duration-500">
                        <div className="absolute top-4 left-4 z-20">
                            <span className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                                <Star className="h-4 w-4 fill-current" />
                                <span>Featured Article</span>
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-0">
                            <div className="relative h-80 md:h-auto overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center space-x-3 mb-4">
                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                                        {featuredPost.category.toUpperCase()}
                                    </span>
                                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                                        <Calendar className="h-4 w-4" />
                                        <span>{featuredPost.date}</span>
                                    </div>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">
                                    {featuredPost.title}
                                </h2>

                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <User className="h-5 w-5 text-gray-400" />
                                            <span className="text-gray-700 font-medium">{featuredPost.author}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="h-5 w-5 text-gray-400" />
                                            <span className="text-gray-600">{featuredPost.readTime}</span>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={() => openArticle(featuredPost)} className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group">
                                    <span>Read Full Article</span>
                                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blog Posts Grid - Multiple Layouts */}
                <div className="max-w-6xl mx-auto">
                    {/* Large Card + 2 Small Cards Layout */}
                    {filteredPosts.length >= 3 && (
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            {/* Large Card */}
                            <article
                                className="md:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
                                style={{
                                    animation: "fadeInUp 0.6s ease-out forwards"
                                }}
                            >
                                <div className="relative overflow-hidden h-72">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                    <img
                                        src={filteredPosts[0].image}
                                        alt={filteredPosts[0].title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                                            {filteredPosts[0].category.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 z-20">
                                        <h2 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                                            {filteredPosts[0].title}
                                        </h2>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {filteredPosts[0].excerpt}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <User className="h-3 w-3" />
                                                <span>{filteredPosts[0].author}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{filteredPosts[0].readTime}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => toggleLike(filteredPosts[0].id)}
                                                className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                                            >
                                                <Heart className={`h-4 w-4 ${likedPosts.includes(filteredPosts[0].id) ? 'fill-red-500 text-red-500' : ''}`} />
                                                <span className="text-xs">{filteredPosts[0].likes}</span>
                                            </button>
                                            <button className="flex items-center space-x-1 text-gray-500 hover:text-yellow-600 transition-colors">
                                                <MessageCircle className="h-4 w-4" />
                                                <span className="text-xs">{filteredPosts[0].views}</span>
                                            </button>
                                            <button className="flex items-center space-x-1 text-gray-500 hover:text-yellow-600 transition-colors">
                                                <Share2 className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <button onClick={() => openArticle(filteredPosts[0])} className="flex items-center space-x-2 text-yellow-600 font-semibold text-sm hover:text-orange-600 transition-colors group">
                                            <span>Read More</span>
                                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {/* Two Small Cards */}
                            {filteredPosts.slice(1, 3).map((post, index) => (
                                <article
                                    key={post.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
                                    style={{
                                        animationDelay: `${(index + 1) * 0.1}s`,
                                        animation: "fadeInUp 0.6s ease-out forwards"
                                    }}
                                >
                                    <div className="relative overflow-hidden h-48">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3 z-20">
                                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                                                {post.category.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{post.readTime}</span>
                                            </div>
                                            <button
                                                onClick={() => toggleLike(post.id)}
                                                className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                                            >
                                                <Heart className={`h-3 w-3 ${likedPosts.includes(post.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                                <span>{post.likes}</span>
                                            </button>
                                        </div>

                                        <button onClick={() => openArticle(post)} className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 group">
                                            <span>Read Article</span>
                                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Regular Grid - 3 Columns */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {filteredPosts.slice(3).map((post, index) => (
                            <article
                                key={post.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
                                style={{
                                    animationDelay: `${(index + 3) * 0.1}s`,
                                    animation: "fadeInUp 0.6s ease-out forwards"
                                }}
                            >
                                <div className="relative overflow-hidden h-48">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                                            {post.category.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <User className="h-3 w-3" />
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => toggleLike(post.id)}
                                                className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors transform hover:scale-110"
                                            >
                                                <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? 'fill-red-500 text-red-500 animate-pulse' : ''}`} />
                                                <span className="text-xs">{post.likes}</span>
                                            </button>
                                            <button className="flex items-center space-x-1 text-gray-500 hover:text-yellow-600 transition-colors">
                                                <MessageCircle className="h-4 w-4" />
                                                <span className="text-xs">{post.views}</span>
                                            </button>
                                        </div>

                                        <button onClick={() => openArticle(post)} className="flex items-center space-x-2 text-yellow-600 font-semibold text-sm hover:text-orange-600 transition-colors group">
                                            <span>Read</span>
                                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredPosts.length === 0 && (
                        <div className="text-center py-16 animate-fade-in">
                            <Sun className="h-20 w-20 text-yellow-300 mx-auto mb-4 animate-spin-slow" />
                            <h3 className="text-3xl font-bold text-gray-700 mb-2">No articles found</h3>
                            <p className="text-gray-500 text-lg">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>

                {/* Newsletter Section with Enhanced Animation */}
                <div className="max-w-4xl mx-auto mt-20 animate-fade-in">
                    <div className="relative bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-3xl shadow-2xl p-10 md:p-16 border-4 border-yellow-500 overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-5 left-5 w-24 h-24 bg-white rounded-full animate-float"></div>
                            <div className="absolute bottom-5 right-10 w-32 h-32 bg-white rounded-full animate-float-delayed"></div>
                            <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white rounded-full animate-float-slow"></div>
                        </div>

                        <div className="text-center relative z-10">
                            <div className="flex items-center justify-center space-x-3 mb-6">
                                <Zap className="h-14 w-14 text-white animate-bounce" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">Subscribe to our newsletter</h2>
                            <p className="text-lg text-white mt-4">Stay updated with our latest news and articles</p>
                            <form className="mt-8">
                                <div className="flex items-center space-x-4">
                                    <input type="email" placeholder="Enter your email" className="w-full p-4 border-2 border-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                                    <button type="submit" className="bg-white text-yellow-600 px-8 py-4 rounded-2xl hover:bg-yellow-600 hover:text-white transition-colors">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;


