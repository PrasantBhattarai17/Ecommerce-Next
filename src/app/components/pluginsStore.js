import guterberg from '../../../public/pluginsImgs/gutenberg.jpg'
import ultimate from '../../../public/pluginsImgs/ultimate.jpg'
import starter from '../../../public/pluginsImgs/starter.jpg'

const plugins = [
    {
        id: 1,
        name: 'Gutenberg Blocks',
        slug: 'gutenberg-blocks',
        img: guterberg,
        price: 9.0,
        category: 'Page Builder',
        description: 'Extend Gutenberg with powerful custom blocks. Create stunning layouts without coding.',
        longDescription: 'Gutenberg Blocks is a comprehensive WordPress plugin that extends the native Gutenberg editor with 50+ custom blocks. Create beautiful layouts, add animations, and build professional websites without any coding knowledge. Perfect for designers and developers who want more flexibility.',
        features: ['50+ Custom Blocks', 'Drag & Drop Builder', 'Animation Effects', 'Responsive Controls', 'Template Library', 'Regular Updates'],
        rating: 4.8,
        reviews: 1234,
        inStock: true
    },
    {
        id: 2,
        name: 'Ultimate Toolkit',
        slug: 'ultimate-toolkit',
        img: ultimate,
        price: 14.0,
        category: 'Utility',
        description: 'All-in-one WordPress toolkit with essential features for any website. Boost performance and functionality.',
        longDescription: 'Ultimate Toolkit is a comprehensive WordPress plugin that includes essential features like security enhancements, performance optimization, SEO tools, and custom post types. It\'s the perfect solution for website owners who want everything in one package.',
        features: ['Security Features', 'Performance Optimization', 'SEO Tools', 'Custom Post Types', 'Backup System', 'Analytics Integration'],
        rating: 4.9,
        reviews: 2156,
        inStock: true
    },
    {
        id: 3,
        name: 'Starter Pack',
        slug: 'starter-pack',
        img: starter,
        price: 24.0,
        category: 'Starter Kit',
        description: 'Complete starter package for new WordPress sites. Includes themes, plugins, and setup wizard.',
        longDescription: 'Starter Pack is the ultimate solution for launching new WordPress websites. It includes premium themes, essential plugins, demo content, and a setup wizard that guides you through the entire process. Perfect for beginners and professionals alike.',
        features: ['Premium Themes', 'Essential Plugins', 'Demo Content', 'Setup Wizard', 'Video Tutorials', '1 Year Support'],
        rating: 4.7,
        reviews: 892,
        inStock: true
    }
]

export default plugins;