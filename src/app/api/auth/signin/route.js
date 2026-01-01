import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/app/lib/db'
import { generateToken } from '@/app/lib/jwt'
import sql from 'mssql'

export async function POST(request) {
    try {
        const body = await request.json()
        const { email, password } = body

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        // Ensure database connection
        const pool = await connectDB()
        const requestQuery = pool.request()

        // Find user by email
        requestQuery.input('email', sql.NVarChar, email)
        const result = await requestQuery.query('SELECT Id, Name, Email, Password FROM Users WHERE Email = @email')

        if (result.recordset.length === 0) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            )
        }

        const user = result.recordset[0]

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.Password)

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            )
        }

        // Generate JWT token
        const token = generateToken({
            userId: user.Id,
            email: user.Email,
            name: user.Name,
        })

        return NextResponse.json({
            message: 'Login successful',
            token,
            user: {
                Id: user.Id,
                Name: user.Name,
                Email: user.Email,
            },
        })
    } catch (error) {
        console.error('Signin error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
