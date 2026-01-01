'use client'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BsPerson, BsBagCheck, BsHeart, BsGeoAlt, BsShieldLock, BsBoxSeam } from "react-icons/bs"
import { IoMdArrowForward, IoMdLogOut } from "react-icons/io"

export default function ProfilePage() {
    const { user, loading, logout, isAuthenticated } = useAuth()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('overview')

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth/signin?redirect=/profile')
        }
    }, [loading, isAuthenticated, router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    if (!user) return null

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: <BsPerson /> },
        { id: 'orders', label: 'My Orders', icon: <BsBagCheck />, link: '/orders' },
        { id: 'wishlist', label: 'Wishlist', icon: <BsHeart />, link: '/wishlist' },
        { id: 'addresses', label: 'Addresses', icon: <BsGeoAlt /> },
        { id: 'security', label: 'Security', icon: <BsShieldLock /> },
    ]

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-40">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-10 animate-slide-in">
                    <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
                    <p className="text-gray-500 mt-2">Manage your profile, orders, and preferences.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/4">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-100">
                                    {user.Name?.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-900 truncate max-w-[150px]">{user.Name}</h2>
                                    <p className="text-sm text-gray-500 truncate max-w-[150px]">{user.Email}</p>
                                </div>
                            </div>
                            <nav className="p-4">
                                <ul className="space-y-2">
                                    {menuItems.map((item) => (
                                        <li key={item.id}>
                                            {item.link ? (
                                                <Link
                                                    href={item.link}
                                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:bg-slate-50 text-gray-600 hover:text-indigo-600`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl">{item.icon}</span>
                                                        <span className="font-medium">{item.label}</span>
                                                    </div>
                                                    <IoMdArrowForward className="text-slate-300" />
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={() => setActiveTab(item.id)}
                                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${activeTab === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-slate-50 hover:text-indigo-600'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl">{item.icon}</span>
                                                        <span className="font-medium">{item.label}</span>
                                                    </div>
                                                    {activeTab === item.id && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-sm shadow-indigo-200"></div>}
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                    <li className="pt-4 mt-4 border-t border-slate-50">
                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200"
                                        >
                                            <IoMdLogOut className="text-xl" />
                                            <span className="font-medium">Sign Out</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 min-h-[500px]">
                            {activeTab === 'overview' && (
                                <div className="animate-slide-in">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Overview</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account ID</label>
                                            <p className="mt-1 font-mono text-gray-700">#USER-{user.Id?.toString().padStart(4, '0')}</p>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Since</label>
                                            <p className="mt-1 text-gray-700">{new Date(user.CreatedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-50 pb-6">
                                            <div>
                                                <h4 className="font-bold text-gray-900">Personal Information</h4>
                                                <p className="text-sm text-gray-500">Update your name and email address.</p>
                                            </div>
                                            <button className="mt-4 md:mt-0 text-indigo-600 font-semibold text-sm hover:underline">Edit Info</button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase">Full Name</p>
                                                <p className="font-medium text-gray-800">{user.Name}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase">Email Address</p>
                                                <p className="font-medium text-gray-800">{user.Email}</p>
                                            </div>
                                        </div>

                                        <div className="pt-8">
                                            <Link href="/orders" className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl shadow-indigo-100 group transition-all hover:scale-[1.01]">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                                        <BsBoxSeam className="text-2xl" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold">Recent Orders</h4>
                                                        <p className="text-white/70 text-sm">View and track your previous purchases.</p>
                                                    </div>
                                                </div>
                                                <IoMdArrowForward className="text-2xl group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'addresses' && (
                                <div className="animate-slide-in text-center py-20">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <BsGeoAlt className="text-3xl text-slate-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">No Addresses Saved</h3>
                                    <p className="text-gray-500 mt-2 max-w-xs mx-auto">Add a shipping address to speed up your checkout process.</p>
                                    <button className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">Add New Address</button>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="animate-slide-in">
                                    <h3 className="text-xl font-bold text-gray-900 mb-8">Security Settings</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                    <BsShieldLock />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800">Change Password</h4>
                                                    <p className="text-xs text-slate-500">Last updated 3 months ago</p>
                                                </div>
                                            </div>
                                            <IoMdArrowForward className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
