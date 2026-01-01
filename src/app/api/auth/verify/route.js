import { NextResponse } from 'next/server'
import { verifyToken } from '@/app/lib/jwt'

export async function GET(request) {
    try {
        const authHeader = request.headers.get('authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'No token provided' },
                { status: 401 }
            )
        }

        const token = authHeader.substring(7)
        const decoded = verifyToken(token)

        if (!decoded) {
            return NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 401 }
            )
        }

        return NextResponse.json({
            valid: true,
            user: {
                Id: decoded.userId,
                Email: decoded.email,
                Name: decoded.name,
            },
        })
    } catch (error) {
        console.error('Token verification error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

