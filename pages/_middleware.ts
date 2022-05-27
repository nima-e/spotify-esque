import { NextResponse } from "next/server"


const signedInPages = ['/', '/playlist', 'library']

export default function middleware(req) {
    if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
        const token = req.cookies.MY_ACCESS_TOKEN
        const url = req.nextUrl.clone()
        url.pathname = '/signin'
        if( !token) {
            return NextResponse.redirect(url)
        }
    }
}