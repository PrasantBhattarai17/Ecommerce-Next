// API service for fetching products from DummyJSON API (higher product count)
const API_BASE_URL = 'https://dummyjson.com'

// Transform DummyJSON product to app product format
const transformProduct = (apiProduct) => {
    return {
        id: apiProduct.id,
        name: apiProduct.title,
        slug: apiProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        img: apiProduct.thumbnail,
        image: apiProduct.thumbnail, // Standardize on both property names
        images: apiProduct.images,
        price: apiProduct.price,
        originalPrice: apiProduct.price / (1 - apiProduct.discountPercentage / 100),
        category: apiProduct.category,
        description: apiProduct.description,
        longDescription: apiProduct.description,
        features: apiProduct.tags || [],
        rating: apiProduct.rating || 0,
        reviews: Math.floor(Math.random() * 200) + 10, // Randomized reviews count
        inStock: apiProduct.stock > 0,
        brand: apiProduct.brand,
        stock: apiProduct.stock
    }
}

// Fetch all products (getting a larger set from dummyjson)
export const fetchAllProducts = async () => {
    try {
        // dummyjson defaults to 30, but we can request more
        const response = await fetch(`${API_BASE_URL}/products?limit=100`)
        if (!response.ok) {
            throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        return data.products.map(transformProduct)
    } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }
}

// Fetch a single product by ID
export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`)
        if (!response.ok) {
            throw new Error('Failed to fetch product')
        }
        const data = await response.json()
        return transformProduct(data)
    } catch (error) {
        console.error('Error fetching product:', error)
        throw error
    }
}

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/category/${category}`)
        if (!response.ok) {
            throw new Error('Failed to fetch products by category')
        }
        const data = await response.json()
        return data.products.map(transformProduct)
    } catch (error) {
        console.error('Error fetching products by category:', error)
        throw error
    }
}

// Fetch all categories
export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/categories`)
        if (!response.ok) {
            throw new Error('Failed to fetch categories')
        }
        const data = await response.json()
        // dummyjson returns objects in recent versions, let's normalize to strings or extract names
        return data.map(cat => typeof cat === 'object' ? cat.name : cat)
    } catch (error) {
        console.error('Error fetching categories:', error)
        throw error
    }
}

// Fetch limited products (for featured products)
export const fetchLimitedProducts = async (limit = 8) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products?limit=${limit}`)
        if (!response.ok) {
            throw new Error('Failed to fetch limited products')
        }
        const data = await response.json()
        return data.products.map(transformProduct)
    } catch (error) {
        console.error('Error fetching limited products:', error)
        throw error
    }
}
