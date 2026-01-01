// API service for fetching products from FakeStore API
const API_BASE_URL = 'https://fakestoreapi.com'

// Transform API product to app product format
const transformProduct = (apiProduct) => {
    return {
        id: apiProduct.id,
        name: apiProduct.title,
        slug: apiProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        img: apiProduct.image,
        price: apiProduct.price,
        originalPrice: null, // FakeStore API doesn't provide original price
        category: apiProduct.category,
        description: apiProduct.description,
        longDescription: apiProduct.description,
        features: [], // FakeStore API doesn't provide features
        rating: apiProduct.rating?.rate || 0,
        reviews: apiProduct.rating?.count || 0,
        inStock: true, // Assume all products are in stock
        brand: null // FakeStore API doesn't provide brand
    }
}

// Fetch all products
export const fetchAllProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`)
        if (!response.ok) {
            throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        return data.map(transformProduct)
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
        return data.map(transformProduct)
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
        return await response.json()
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
        return data.map(transformProduct)
    } catch (error) {
        console.error('Error fetching limited products:', error)
        throw error
    }
}

