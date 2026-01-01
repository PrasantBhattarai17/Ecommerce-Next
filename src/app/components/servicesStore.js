
// import { FaStar } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { BsFillCollectionFill } from "react-icons/bs";
import { FaAccusoft } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { FaRocket } from "react-icons/fa";
import { MdOutlineSupport } from "react-icons/md";
const iconCss = 'text-indigo-500 text-4xl mb-5'
const services =[
    {
        id:1,
        icon: <IoMdSettings className={iconCss}/>,
        name: "Easy Shopping Experience",
        desc: "Browse and shop with ease. Our intuitive interface makes finding your favorite products simple and enjoyable.",
    },{
        id:2,
        icon: <BsFillCollectionFill className={iconCss}/>,
        name: "50,000+ Products",
        desc: "From electronics to fashion, home essentials to sports gear - we have everything you need in one place.",
    },{
        id:3,
        icon: <FaAccusoft className={iconCss}/>,
        name: "Best Prices Guaranteed",
        desc: "We offer competitive prices on all products. Find the best deals and save money on every purchase.",
    },{
        id:4,
        icon: <GrUpdate className={iconCss}/>,
        name: "Daily New Arrivals",
        desc: "Discover fresh products added daily. Stay updated with the latest trends and newest items in the market.",
    },{
        id:5,
        icon: <FaRocket className={iconCss}/>,
        name: "Lightning Fast Delivery",
        desc: "Get your orders delivered quickly. Fast shipping options available for all products with real-time tracking.",
    },{
        id:6,
        icon: <MdOutlineSupport className={iconCss}/>,
        name: "24/7 Customer Support",
        desc: "Our dedicated support team is always ready to help. Get assistance whenever you need it, day or night.",
    },
]


export default services;