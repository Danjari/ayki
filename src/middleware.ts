// import { clerkMiddleware } from "@clerk/nextjs/server";
import {authMiddleware} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export default authMiddleware({
    publicRoutes: ["/site",'/api/uploadthing'],
    async beforeAuth( auth, req ) {},
    async afterAuth( auth, req ) {
        // rewrites for domains 
        const url = req.nextUrl
        const searchParams = url.searchParams.toString()
        let hostname = req.headers
        const pathWithSearchParams = `${url.pathname}${searchParams.length>0? `?${searchParams}`:'' 
    }`
    // if subdomain exist, 
    const customSubDomain = hostname.get("host")?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`).filter(Boolean)[0]

    if (customSubDomain){
        return NextResponse.rewrite(new URL(`/${customSubDomain}${pathWithSearchParams}`,req.url))
    }

    if (url.pathname === '/sign-in' || url.pathname === '/sign-up'){
        return NextResponse.redirect(new URL(`/agency/sign-in`,req.url))
    }
    if (url.pathname === "/" || url.pathname === "/site" && url.hostname === process.env.NEXT_PUBLIC_DOMAIN){
        return NextResponse.rewrite(new URL(`/site`,req.url))
    }

    if (url.pathname.startsWith('/agency')|| url.pathname.startsWith('subaccount'))
    {
        return NextResponse.rewrite(new URL(`${pathWithSearchParams}`,req.url))
    }
}});
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};