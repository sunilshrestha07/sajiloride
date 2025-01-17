import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const response = NextResponse.next();

    // Set universal CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed methods
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            status: 200,
        });
    }

    return response;
}

export const config = {
    matcher: '/api/:path*', // Apply middleware to all API routes
};
