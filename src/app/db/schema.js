// Drizzle ORM schema definitions for SQL Server
// Using table definitions that work with Drizzle's SQL builder
import { sql } from 'drizzle-orm'
import { pgTable, int, varchar, decimal, timestamp, index } from 'drizzle-orm/pg-core'

// Note: Drizzle's SQL Server support is limited, so we'll use the SQL builder
// with direct table references. These definitions provide type safety.

// Users table schema definition
export const users = {
    tableName: 'Users',
    id: 'Id',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
}

// Orders table schema definition
export const orders = {
    tableName: 'Orders',
    id: 'Id',
    orderId: 'OrderId',
    userId: 'UserId',
    total: 'Total',
    status: 'Status',
    firstName: 'FirstName',
    lastName: 'LastName',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    state: 'State',
    zipCode: 'ZipCode',
    country: 'Country',
    paymentMethod: 'PaymentMethod',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
}

// OrderItems table schema definition
export const orderItems = {
    tableName: 'OrderItems',
    id: 'Id',
    orderId: 'OrderId',
    productId: 'ProductId',
    productName: 'ProductName',
    productImage: 'ProductImage',
    price: 'Price',
    quantity: 'Quantity',
    subtotal: 'Subtotal',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
}
