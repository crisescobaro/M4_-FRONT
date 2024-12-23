"use client"

import { useAuth } from "@/contexts/ContextAuht"

export default function Private({ children,}: {children: React.ReactNode}) {
    const { isAuthenticated } = useAuth();

    if(isAuthenticated) return children;
}