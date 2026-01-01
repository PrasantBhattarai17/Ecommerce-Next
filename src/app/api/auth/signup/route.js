import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB, executeQueryOne, executeQuery } from '@/app/lib/db'
import { generateToken } from '@/app/lib/jwt'
import sql from 'mssql'

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, password } = body

        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Name, email, and password are required' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            )
        }

        // Ensure database connection
        const pool = await connectDB()
        const requestQuery = pool.request()

        // Check if user already exists
        requestQuery.input('email', sql.NVarChar, email)
        const existingUser = await requestQuery.query('SELECT Id, Name, Email FROM Users WHERE Email = @email')

        if (existingUser.recordset.length > 0) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const insertRequest = pool.request()
        insertRequest.input('name', sql.NVarChar, name)
        insertRequest.input('email', sql.NVarChar, email)
        insertRequest.input('password', sql.NVarChar, hashedPassword)
        const result = await insertRequest.query(`
            INSERT INTO Users (Name, Email, Password)
            OUTPUT INSERTED.Id, INSERTED.Name, INSERTED.Email
            VALUES (@name, @email, @password)
        `)

        const user = result.recordset[0]

        // Generate JWT token
        const token = generateToken({
            userId: user.Id,
            email: user.Email,
            name: user.Name,
        })

        return NextResponse.json(
            {
                message: 'User created successfully',
                token,
                user: {
                    Id: user.Id,
                    Name: user.Name,
                    Email: user.Email,
                },
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Signup error:', error)
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            number: error.number,
            originalError: error.originalError?.message,
            stack: error.stack
        })

        // Handle unique constraint violation
        if (error.code === 'EREQUEST' && (error.message?.includes('UNIQUE') || error.number === 2627)) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            )
        }

        // Return more detailed error in development
        const errorMessage = process.env.NODE_ENV === 'development'
            ? error.message || 'Internal server error'
            : 'Internal server error'

        return NextResponse.json(
            {
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? {
                    code: error.code,
                    number: error.number,
                    originalError: error.originalError?.message
                } : undefined
            },
            { status: 500 }
        )
    }
}
