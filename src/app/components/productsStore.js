// Using existing images and repurposing them for different product categories
import lotus from '../../../public/themesImgs/lotus.jpg'
import coffee from '../../../public/themesImgs/coffee.jpg'
import steak from '../../../public/themesImgs/steak.jpg'
import baby from '../../../public/themesImgs/baby.jpg'
import pet from '../../../public/themesImgs/pet.jpg'
import yoga from '../../../public/themesImgs/yoga.jpg'
import brand from '../../../public/themesImgs/brand.jpg'
import outdoor from '../../../public/themesImgs/outdoor.jpg'
import love from '../../../public/themesImgs/love.jpg'
import guterberg from '../../../public/pluginsImgs/gutenberg.jpg'
import ultimate from '../../../public/pluginsImgs/ultimate.jpg'
import starter from '../../../public/pluginsImgs/starter.jpg'

const products = [
    // Electronics
    {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        slug: 'wireless-bluetooth-headphones',
        img: guterberg,
        price: 79.99,
        originalPrice: 99.99,
        category: 'Electronics',
        description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
        longDescription: 'Experience crystal-clear audio with our premium wireless Bluetooth headphones. Featuring active noise cancellation technology, these headphones block out ambient noise so you can focus on your music. With a 30-hour battery life, you can enjoy your favorite tunes all day long. The comfortable over-ear design and premium materials ensure a perfect fit for extended listening sessions.',
        features: ['Active Noise Cancellation', '30-Hour Battery Life', 'Bluetooth 5.0', 'Premium Sound Quality', 'Comfortable Design', 'Quick Charge'],
        rating: 4.8,
        reviews: 2341,
        inStock: true,
        brand: 'TechSound'
    },
    {
        id: 2,
        name: 'Smart Watch Pro',
        slug: 'smart-watch-pro',
        img: ultimate,
        price: 249.99,
        originalPrice: 299.99,
        category: 'Electronics',
        description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and smartphone notifications.',
        longDescription: 'Stay connected and track your fitness with the Smart Watch Pro. This advanced wearable features a bright AMOLED display, comprehensive health tracking including heart rate, sleep monitoring, and step counting. Receive notifications from your smartphone, control music playback, and access apps right from your wrist. Water-resistant design perfect for workouts and daily wear.',
        features: ['Fitness Tracking', 'Heart Rate Monitor', 'AMOLED Display', 'Water Resistant', 'Smartphone Notifications', '7-Day Battery'],
        rating: 4.7,
        reviews: 1892,
        inStock: true,
        brand: 'TechWear'
    },
    {
        id: 3,
        name: 'Portable Power Bank 20000mAh',
        slug: 'portable-power-bank',
        img: starter,
        price: 39.99,
        originalPrice: 49.99,
        category: 'Electronics',
        description: 'High-capacity power bank with fast charging technology. Keep your devices powered on the go.',
        longDescription: 'Never run out of battery with our high-capacity 20000mAh power bank. Featuring fast charging technology, this portable charger can fully charge your smartphone multiple times. With multiple USB ports, you can charge multiple devices simultaneously. The sleek design and LED indicator make it perfect for travel and daily use.',
        features: ['20000mAh Capacity', 'Fast Charging', 'Multiple USB Ports', 'LED Indicator', 'Compact Design', 'Universal Compatibility'],
        rating: 4.6,
        reviews: 3124,
        inStock: true,
        brand: 'PowerMax'
    },
    // Fashion & Clothing
    {
        id: 4,
        name: 'Classic Denim Jacket',
        slug: 'classic-denim-jacket',
        img: brand,
        price: 59.99,
        originalPrice: 79.99,
        category: 'Fashion',
        description: 'Timeless denim jacket with a modern fit. Perfect for layering and adding style to any outfit.',
        longDescription: 'A wardrobe essential, this classic denim jacket features a comfortable fit and durable construction. Made from premium denim, it offers a timeless look that never goes out of style. Perfect for casual outings, this jacket pairs well with jeans, dresses, or shorts. Available in multiple sizes for the perfect fit.',
        features: ['Premium Denim', 'Classic Design', 'Comfortable Fit', 'Durable Construction', 'Multiple Sizes', 'Machine Washable'],
        rating: 4.5,
        reviews: 856,
        inStock: true,
        brand: 'StyleCo'
    },
    {
        id: 5,
        name: 'Running Shoes Pro',
        slug: 'running-shoes-pro',
        img: outdoor,
        price: 89.99,
        originalPrice: 119.99,
        category: 'Fashion',
        description: 'Professional running shoes with advanced cushioning and breathable design for maximum comfort.',
        longDescription: 'Take your running to the next level with these professional running shoes. Featuring advanced cushioning technology that absorbs impact and provides superior comfort, these shoes are perfect for long-distance running. The breathable mesh upper keeps your feet cool, while the durable outsole provides excellent traction on various surfaces.',
        features: ['Advanced Cushioning', 'Breathable Design', 'Durable Outsole', 'Lightweight', 'Multiple Colors', 'True to Size'],
        rating: 4.8,
        reviews: 2145,
        inStock: true,
        brand: 'RunFast'
    },
    {
        id: 6,
        name: 'Designer Sunglasses',
        slug: 'designer-sunglasses',
        img: love,
        price: 129.99,
        originalPrice: 179.99,
        category: 'Fashion',
        description: 'Stylish designer sunglasses with UV protection and polarized lenses for eye protection and style.',
        longDescription: 'Protect your eyes in style with these designer sunglasses. Featuring polarized lenses that reduce glare and provide 100% UV protection, these sunglasses are perfect for sunny days. The lightweight frame and comfortable fit make them ideal for all-day wear. Available in multiple frame colors and lens options.',
        features: ['Polarized Lenses', '100% UV Protection', 'Lightweight Frame', 'Stylish Design', 'Multiple Colors', 'Case Included'],
        rating: 4.7,
        reviews: 1234,
        inStock: true,
        brand: 'SunStyle'
    },
    // Home & Kitchen
    {
        id: 7,
        name: 'Stainless Steel Cookware Set',
        slug: 'stainless-steel-cookware',
        img: steak,
        price: 149.99,
        originalPrice: 199.99,
        category: 'Home & Kitchen',
        description: 'Complete 10-piece cookware set with non-stick coating. Perfect for any kitchen.',
        longDescription: 'Upgrade your kitchen with this premium 10-piece stainless steel cookware set. Each piece features a non-stick coating for easy cooking and cleaning. The set includes various sized pots and pans to handle all your cooking needs. Compatible with all cooktops including induction, these pieces are built to last.',
        features: ['10-Piece Set', 'Non-Stick Coating', 'Stainless Steel', 'Induction Compatible', 'Dishwasher Safe', 'Lifetime Warranty'],
        rating: 4.9,
        reviews: 3456,
        inStock: true,
        brand: 'KitchenPro'
    },
    {
        id: 8,
        name: 'Smart Coffee Maker',
        slug: 'smart-coffee-maker',
        img: coffee,
        price: 199.99,
        originalPrice: 249.99,
        category: 'Home & Kitchen',
        description: 'Programmable coffee maker with smart features. Start your day with the perfect cup of coffee.',
        longDescription: 'Wake up to the perfect cup of coffee with this smart coffee maker. Program your preferred brew time, strength, and temperature. The large capacity carafe keeps your coffee hot for hours. With a built-in grinder and multiple brew options, this coffee maker is perfect for coffee enthusiasts.',
        features: ['Programmable Timer', 'Built-in Grinder', 'Large Capacity', 'Multiple Brew Options', 'Auto Shut-off', 'Easy Clean'],
        rating: 4.8,
        reviews: 2789,
        inStock: true,
        brand: 'BrewMaster'
    },
    {
        id: 9,
        name: 'Yoga Mat Premium',
        slug: 'yoga-mat-premium',
        img: yoga,
        price: 34.99,
        originalPrice: 49.99,
        category: 'Sports & Fitness',
        description: 'Extra-thick yoga mat with superior grip and cushioning for comfortable workouts.',
        longDescription: 'Enhance your yoga practice with this premium yoga mat. The extra-thick design provides superior cushioning and support for your joints. The non-slip surface ensures stability during poses, while the eco-friendly materials make it safe for you and the environment. Lightweight and easy to carry, perfect for home or studio use.',
        features: ['Extra-Thick Design', 'Non-Slip Surface', 'Eco-Friendly Materials', 'Lightweight', 'Easy to Clean', 'Carrying Strap Included'],
        rating: 4.6,
        reviews: 1890,
        inStock: true,
        brand: 'FitLife'
    },
    // Baby & Kids
    {
        id: 10,
        name: 'Baby Stroller Deluxe',
        slug: 'baby-stroller-deluxe',
        img: baby,
        price: 179.99,
        originalPrice: 229.99,
        category: 'Baby & Kids',
        description: 'Premium baby stroller with adjustable seat, large storage basket, and smooth maneuverability.',
        longDescription: 'Keep your little one comfortable and safe with this deluxe baby stroller. Featuring an adjustable seat that reclines for napping, a large storage basket for all your essentials, and smooth-rolling wheels for easy maneuverability. The lightweight yet sturdy design makes it perfect for daily walks and travel.',
        features: ['Adjustable Seat', 'Large Storage Basket', 'Smooth Maneuverability', 'Lightweight Design', 'Safety Harness', 'Sun Canopy'],
        rating: 4.7,
        reviews: 1456,
        inStock: true,
        brand: 'BabyCare'
    },
    // Pet Supplies
    {
        id: 11,
        name: 'Pet Bed Comfort Plus',
        slug: 'pet-bed-comfort-plus',
        img: pet,
        price: 49.99,
        originalPrice: 69.99,
        category: 'Pet Supplies',
        description: 'Orthopedic pet bed with memory foam for ultimate comfort. Perfect for dogs and cats.',
        longDescription: 'Give your furry friend the comfort they deserve with this orthopedic pet bed. The memory foam base provides excellent support for joints and muscles, making it perfect for older pets or those with arthritis. The removable, machine-washable cover makes cleaning easy, while the non-slip bottom keeps the bed in place.',
        features: ['Memory Foam Base', 'Orthopedic Support', 'Removable Cover', 'Machine Washable', 'Non-Slip Bottom', 'Multiple Sizes'],
        rating: 4.8,
        reviews: 2341,
        inStock: true,
        brand: 'PetComfort'
    },
    // Beauty & Personal Care
    {
        id: 12,
        name: 'Spa Gift Set Premium',
        slug: 'spa-gift-set-premium',
        img: lotus,
        price: 79.99,
        originalPrice: 99.99,
        category: 'Beauty & Personal Care',
        description: 'Luxury spa gift set with essential oils, bath bombs, and skincare products for ultimate relaxation.',
        longDescription: 'Indulge in ultimate relaxation with this premium spa gift set. Includes essential oils, aromatic bath bombs, luxurious body lotion, and a relaxing face mask. All products are made with natural ingredients and are perfect for self-care or gifting. Transform your bathroom into a personal spa experience.',
        features: ['Essential Oils', 'Bath Bombs', 'Body Lotion', 'Face Mask', 'Natural Ingredients', 'Gift Box Included'],
        rating: 4.9,
        reviews: 1678,
        inStock: true,
        brand: 'SpaLuxury'
    }
]

export default products;

