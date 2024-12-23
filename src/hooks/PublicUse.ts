/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useAuth } from "../contexts/ContextAuht";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const usePublic = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        isAuthenticated && router.push("/home");
    }, []);
};