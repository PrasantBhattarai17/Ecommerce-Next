# ShopActive - Modern E-commerce Platform

ShopActive is a premium, full-stack e-commerce application built with **Next.js 14**, **SQL Server**, and **Tailwind CSS**. It features a headless product management system, secure JWT-based authentication, a dynamic cart/wishlist management system, and integrated **Khalti Payment Gateway**.

## 🚀 Key Features

- **Headless E-commerce**: Unified interface for Products, Themes, and Plugins.
- **Khalti Payment Integration**: SecureNepalese payment gateway integration with real-time verification.
- **Dynamic Pricing**: Intelligent USD to NPR conversion (Rs.) throughout the platform.
- **User Authentication**: Secure Login/Signup with JWT and BCrypt password hashing.
- **Premium UI/UX**:
  - Glassmorphic Sticky Navbar with scroll detection.
  - Responsive Product Grids and Detail pages.
  - Interactive Cart and Wishlist management.
- **Robust Backend**: SQL Server integration for Orders, Order Items, and User data.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, React Context API.
- **Backend**: Next.js API Routes (Serverless), SQL Server (MSSQL).
- **ORM/Driver**: `mssql` node-driver.
- **Security**: JSON Web Tokens (JWT), BCrypt.js.
- **Payments**: Khalti Web SDK / API v2.
- **Icons**: React Icons (Bs, Fa, Io).

## 📁 Application Structure

```text
├── src/app
│   ├── api/                # Serverless API routes
│   │   ├── auth/           # Login, Signup, Verify
│   │   ├── orders/         # Order creation and retrieval
│   │   └── payment/khalti/ # Khalti callback and verification
│   ├── cart/               # Shopping cart experience
│   ├── checkout/           # Multi-step checkout flow
│   ├── components/         # Reusable UI components
│   ├── context/            # Auth, Cart, and Toast Contexts
│   ├── lib/                # DB config, JWT utils, Currency tools
│   ├── products/           # Product listings and detail pages
│   └── profile/            # User account management
├── database/               # SQL Schema and migration scripts
└── public/                 # Static assets and images
```

## ⚙️ Prerequisites

- **Node.js**: v18+
- **Database**: SQL Server (Express or Standard)
- **Local Env**: `.env.local` configured with the following:

```env
# Database Configuration
DB_SERVER=YOUR_SERVER_NAME
DB_NAME=ecommerce_db
DB_USER=YOUR_USER (Leave empty for Windows Auth)
DB_PASSWORD=YOUR_PASSWORD

# JWT Security
JWT_SECRET=your_long_secure_secret_key
JWT_EXPIRES_IN=7d

# Khalti Gateway (Test)
KHALTI_SECRET_KEY=live_secret_key_...
KHALTI_BASE_URL=https://dev.khalti.com/api/v2
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Database Setup**:
   Execute the scripts in `database/schema.sql` on your SQL Server instance to create the necessary tables (`Users`, `Orders`, `OrderItems`).

4. **Environment Variables**:
   Create a `.env.local` file in the root directory and add your credentials.

5. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💳 Testing Payments (Khalti)

Use the following credentials in the sandbox environment:
- **Mobile**: `9800000000`
- **MPIN**: `1111`
- **OTP**: `987654`

## 📄 License

This project is private and for demonstration purposes.
