# Admin Management System

This document describes the admin management system for vendor bills and blog posts.

## Overview

The admin system consists of four main pages:
1. **Admin Login** - Authentication page for admin users
2. **Admin Dashboard** - Overview with statistics and recent activity
3. **Vendor Management** - Review and manage vendor bill submissions
4. **Blog Management** - Review and manage blog post submissions

## Features

### Admin Login (`/admin/login`)
- Secure authentication with email and password
- JWT token-based authentication
- Automatic redirect to dashboard on successful login
- Error handling with user-friendly messages

### Admin Dashboard (`/admin/dashboard`)
- Overview statistics for vendor bills and blog posts
- Total counts for all submissions
- Pending items requiring review
- Status breakdown (Pending, Approved, Rejected, Published)
- Recent vendor bills (last 5)
- Recent blog posts (last 5)
- Quick navigation to management pages
- Real-time data updates

### Vendor Management (`/admin/vendor-management`)
- View all vendor bill submissions
- Filter bills by status (Pending, Approved, Rejected)
- Search bills by product name or bill number
- Review bill details including:
  - Product name
  - Bill number
  - Bill image
  - Amount
  - Current status
- Approve or reject bills with admin remarks
- Real-time status updates

### Blog Management (`/admin/blog-management`)
- View all blog post submissions
- Filter posts by status (Pending, Approved, Rejected, Published)
- Search posts by title, author, or category
- Review post details including:
  - Title
  - Author
  - Category
  - Content
  - Featured image
  - Tags
  - Created date
- Approve, publish, or reject posts with admin remarks
- Real-time status updates

## Data Models

### Vendor Bill
```javascript
{
  id: Long,
  productName: String,
  billNumber: String,
  billImage: String,      // URL to the bill image
  amount: BigDecimal,
  status: String,         // PENDING, APPROVED, REJECTED
  adminRemark: String
}
```

### Blog Post
```javascript
{
  id: Long,
  title: String,
  author: String,
  category: String,
  content: String,
  featuredImage: String,  // URL to the featured image
  tags: Array<String>,
  status: String,         // PENDING, APPROVED, REJECTED, PUBLISHED
  adminRemark: String,
  createdDate: Date
}
```

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
  - Request: `{ email: string, password: string }`
  - Response: `{ token: string, user: object }`

### Vendor Bills
- `GET /api/vendor/bills` - Get all vendor bills
- `PUT /api/vendor/bills/:id/status` - Update bill status
  - Request: `{ status: string, adminRemark: string }`

### Blog Posts
- `GET /api/blog/posts` - Get all blog posts
- `PUT /api/blog/posts/:id/status` - Update post status
  - Request: `{ status: string, adminRemark: string }`

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Admin Pages**
   - Login: `http://localhost:5173/admin/login`
   - Dashboard: `http://localhost:5173/admin/dashboard`
   - Vendor Management: `http://localhost:5173/admin/vendor-management`
   - Blog Management: `http://localhost:5173/admin/blog-management`

## Authentication Flow

1. Admin enters credentials on the login page
2. System sends POST request to `/api/admin/login`
3. On success, JWT token and user data are stored in localStorage
4. Token is automatically included in all subsequent API requests via axios interceptor
5. If token is invalid or expired (401 response), user is redirected to login page

## Protected Routes

The vendor and blog management pages are protected routes. Users must be authenticated to access them. If a user tries to access these pages without a valid token, they will be automatically redirected to the login page.

## Axios Configuration

The axios instance is configured with:
- Base URL from environment variables
- 10-second timeout
- Request interceptor to add JWT token to headers
- Response interceptor to handle 401 errors and redirect to login

## UI Components

The admin pages use shadcn/ui components for a consistent and modern design:
- Card, CardContent, CardHeader, CardTitle
- Button
- Input
- Label
- Table, TableBody, TableCell, TableHead, TableHeader, TableRow
- Badge
- Textarea
- Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
- Select, SelectContent, SelectItem, SelectTrigger, SelectValue
- Toast notifications for user feedback

## Styling

The pages feature:
- Gradient backgrounds (amber to orange theme)
- Responsive design
- Hover effects and transitions
- Loading states
- Status badges with color coding
- Modern glassmorphism effects

## Error Handling

- Network errors are caught and displayed via toast notifications
- 401 errors automatically redirect to login
- Form validation for required fields
- Loading states during API calls

## Future Enhancements

Potential improvements:
- Pagination for large datasets
- Bulk actions (approve/reject multiple items)
- Export functionality (CSV, PDF)
- Advanced filtering options
- Dashboard with statistics
- Email notifications for status changes
- Audit log for admin actions
