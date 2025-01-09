"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { createOrGetProfile } from '@/app/actions/user';

// Change the export to be a default export
export default function AuthCheck() {
    const { isLoaded, isSignedIn, userId } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoaded) return;

        const handleAuth = async () => {
            // Only redirect if not on auth pages
            if (!isSignedIn && !pathname.includes('/sign-')) {
                router.push('/sign-in');
                return;
            }

            // Only create profile if signed in
            if (isSignedIn && userId) {
                try {
                    await createOrGetProfile();
                } catch (error) {
                    console.error('Profile creation failed:', error);
                    if (error.message === 'Not authenticated') {
                        router.push('/sign-in');
                    }
                }
            }
        };

        handleAuth();
    }, [isLoaded, isSignedIn, userId, router, pathname]);

    // Don't render anything
    return null;
}