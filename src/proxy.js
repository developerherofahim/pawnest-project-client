import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        const loginUrl = new URL("/log-in", request.url);

        loginUrl.searchParams.set(
            "callbackUrl",
            request.nextUrl.pathname
        );

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/all-pet/:id"],
};