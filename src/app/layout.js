import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShopActive - Your One-Stop Online Shopping Destination",
  description: "Discover amazing products at unbeatable prices. Shop electronics, fashion, home & kitchen, sports, and more. Fast shipping and excellent customer service.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body className={`${inter.className} bg-slate-50`}>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <Navbar/>
              <div>
                {children}
              </div>
              <Footer />
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
        </body>
    </html>
  );
}
