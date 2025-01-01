"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthCheck() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded && !userId && !pathname.includes('/sign-')) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router, pathname]);

  return null;
}