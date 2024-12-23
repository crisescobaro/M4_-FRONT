/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */

import { useAuth } from "@/contexts/ContextAuht";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export const usePrivate = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        isAuthenticated && router.push("/home");
    }, []);
}