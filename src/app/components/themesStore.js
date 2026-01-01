import lotus from '../../../public/themesImgs/lotus.jpg'
import coffee from '../../../public/themesImgs/coffee.jpg'
import steak from '../../../public/themesImgs/steak.jpg'
import baby from '../../../public/themesImgs/baby.jpg'
import pet from '../../../public/themesImgs/pet.jpg'
import yoga from '../../../public/themesImgs/yoga.jpg'
import brand from '../../../public/themesImgs/brand.jpg'
import outdoor from '../../../public/themesImgs/outdoor.jpg'
import love from '../../../public/themesImgs/love.jpg'

const themes = [
    {
        id: 1,
        name: 'Lotus Spa',
        slug: 'lotus-spa',
        img: lotus,
        price: 19.0,
        category: 'Spa & Wellness',
        description: 'A beautiful and elegant WordPress theme perfect for spa, wellness centers, and beauty salons. Features a clean design with soothing colors and smooth animations.',
        longDescription: 'Lotus Spa is a premium WordPress theme designed specifically for spa and wellness businesses. It includes pre-built pages for services, pricing, testimonials, and booking. The theme is fully responsive, SEO optimized, and comes with multiple layout options. Perfect for massage therapists, yoga studios, beauty salons, and wellness centers.',
        features: ['Fully Responsive', 'SEO Optimized', 'Booking System Ready', 'Multiple Layouts', 'Customizable Colors', 'One-Click Demo Import'],
        rating: 4.8,
        reviews: 234,
        inStock: true
    },
    {
        id: 2,
        name: 'Coffee Shop',
        slug: 'coffee-shop',
        img: coffee,
        price: 39.0,
        category: 'Food & Beverage',
        description: 'Perfect theme for coffee shops, cafes, and restaurants. Showcase your menu, location, and create an inviting atmosphere for your customers.',
        longDescription: 'Coffee Shop is a modern WordPress theme designed for cafes, coffee shops, and restaurants. It features beautiful menu displays, location maps, reservation system integration, and social media integration. The theme includes multiple homepage layouts and is perfect for businesses looking to create an online presence.',
        features: ['Menu Display', 'Reservation System', 'Location Maps', 'Social Media Integration', 'Multiple Homepage Layouts', 'WooCommerce Ready'],
        rating: 4.9,
        reviews: 456,
        inStock: true
    },
    {
        id: 3,
        name: 'Steak House',
        slug: 'steak-house',
        img: steak,
        price: 29.0,
        category: 'Food & Beverage',
        description: 'Premium restaurant theme with elegant design. Perfect for fine dining establishments, steakhouses, and upscale restaurants.',
        longDescription: 'Steak House is a sophisticated WordPress theme for restaurants and fine dining establishments. It features elegant typography, beautiful image galleries, menu sections, reservation forms, and customer testimonials. The theme creates an upscale atmosphere that matches the quality of your restaurant.',
        features: ['Elegant Design', 'Menu Sections', 'Reservation Forms', 'Image Galleries', 'Testimonials', 'Event Calendar'],
        rating: 4.7,
        reviews: 189,
        inStock: true
    },
    {
        id: 4,
        name: 'Baby Store',
        slug: 'baby-store',
        img: baby,
        price: 39.0,
        category: 'E-commerce',
        description: 'Complete e-commerce solution for baby products. Perfect for online stores selling baby clothes, toys, and accessories.',
        longDescription: 'Baby Store is a WooCommerce-ready WordPress theme designed for baby product stores. It includes product filtering, wishlist functionality, quick view, and multiple checkout options. The theme is optimized for conversions and provides an excellent shopping experience for parents.',
        features: ['WooCommerce Ready', 'Product Filtering', 'Wishlist', 'Quick View', 'Multiple Payment Options', 'Product Reviews'],
        rating: 4.6,
        reviews: 312,
        inStock: true
    },
    {
        id: 5,
        name: 'Pet Lover',
        slug: 'pet-lover',
        img: pet,
        price: 29.0,
        category: 'Pet Services',
        description: 'Ideal theme for pet stores, veterinary clinics, and pet service businesses. Showcase your services and products beautifully.',
        longDescription: 'Pet Lover is a WordPress theme perfect for pet-related businesses. It includes sections for services, products, testimonials, and blog. The theme features a playful design that appeals to pet owners and includes integration with booking systems for appointments.',
        features: ['Service Showcase', 'Product Display', 'Appointment Booking', 'Blog Integration', 'Testimonials', 'Gallery'],
        rating: 4.8,
        reviews: 267,
        inStock: true
    },
    {
        id: 6,
        name: 'Yoga Studio',
        slug: 'yoga-studio',
        img: yoga,
        price: 19.0,
        category: 'Fitness & Wellness',
        description: 'Peaceful and calming theme for yoga studios, meditation centers, and wellness businesses. Create a serene online presence.',
        longDescription: 'Yoga Studio is a minimalist WordPress theme designed for yoga studios and wellness centers. It features a clean, peaceful design with smooth animations, class schedules, instructor profiles, and booking functionality. Perfect for creating a calming online experience.',
        features: ['Class Schedules', 'Instructor Profiles', 'Booking System', 'Minimalist Design', 'Smooth Animations', 'Blog Integration'],
        rating: 4.9,
        reviews: 423,
        inStock: true
    },
    {
        id: 7,
        name: 'Brand Store',
        slug: 'brand-store',
        img: brand,
        price: 39.0,
        category: 'E-commerce',
        description: 'Modern e-commerce theme for fashion brands and retail stores. Showcase your products with style and increase sales.',
        longDescription: 'Brand Store is a premium WooCommerce theme for fashion and retail businesses. It features product lookbooks, size guides, color swatches, and advanced filtering. The theme is designed to maximize conversions and provide an excellent shopping experience.',
        features: ['Product Lookbooks', 'Size Guides', 'Color Swatches', 'Advanced Filtering', 'Wishlist', 'Quick View'],
        rating: 4.7,
        reviews: 521,
        inStock: true
    },
    {
        id: 8,
        name: 'Outdoor Adventure',
        slug: 'outdoor-adventure',
        img: outdoor,
        price: 29.0,
        category: 'Outdoor & Sports',
        description: 'Adventure-themed WordPress theme for outdoor gear stores, travel agencies, and adventure tour companies.',
        longDescription: 'Outdoor Adventure is a WordPress theme designed for outdoor and adventure businesses. It features stunning image displays, tour packages, booking systems, and blog sections. The theme captures the spirit of adventure and is perfect for travel agencies and outdoor gear stores.',
        features: ['Tour Packages', 'Booking System', 'Image Galleries', 'Blog Integration', 'Testimonials', 'Location Maps'],
        rating: 4.8,
        reviews: 198,
        inStock: true
    },
    {
        id: 9,
        name: 'Love Nature',
        slug: 'love-nature',
        img: love,
        price: 19.0,
        category: 'Eco & Nature',
        description: 'Eco-friendly theme for nature-related businesses, organic stores, and environmental organizations.',
        longDescription: 'Love Nature is a WordPress theme for eco-friendly and nature-related businesses. It features organic color schemes, product displays, blog sections, and donation integration. Perfect for organic stores, environmental organizations, and nature blogs.',
        features: ['Eco-Friendly Design', 'Product Display', 'Donation Integration', 'Blog Sections', 'Event Calendar', 'Newsletter Integration'],
        rating: 4.6,
        reviews: 145,
        inStock: true
    }
]

export default themes;
