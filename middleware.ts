import { authMiddleware } from '@clerk/nextjs';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
export default authMiddleware({
    publicRoutes: ["/", "/api/public"],
    ignoredRoutes: ["/api/webhook"]
});

export const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)",
        "/",
        "/(api|trpc)(.*)"
    ],
};