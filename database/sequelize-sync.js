// Script to sync Sequelize models with database
// Run this script to create tables: node database/sequelize-sync.js

import { connectDB } from '../src/app/lib/db.js'
import { User, Order, OrderItem } from '../src/app/models/index.js'

async function syncDatabase() {
    try {
        console.log('Connecting to database...')
        await connectDB()
        
        console.log('Syncing models...')
        // Use { force: true } to drop and recreate tables (CAUTION: This will delete all data!)
        // Use { alter: true } to update existing tables
        // Use {} or no option to only create missing tables
        await User.sync({ alter: false })
        await Order.sync({ alter: false })
        await OrderItem.sync({ alter: false })
        
        console.log('Database sync completed successfully!')
        process.exit(0)
    } catch (error) {
        console.error('Error syncing database:', error)
        process.exit(1)
    }
}

syncDatabase()

