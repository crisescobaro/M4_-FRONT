// "use client"

// import axios from "axios";
// import { IUser } from "../../../interfaces/IUser";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { ILoginForm } from "../../../interfaces/ILoginForm";

// // interface AuthContextType {
// //     user: IUser | null;
// //     isAuthenticated: boolean;
// //     login: (token: string, user: IUser) => void;
// //     logout: () => void;
// // }


// // const AuthContext = createContext<AuthContextType>({
// //     user: null,
// //     login: (form: ILoginForm)=> {},
// //     logout: () => {},
// //     isAuthenticated: false,
// // });

// interface AuthContextType {
//     user: IUser | null;
//     isAuthenticated: boolean;
//     login: (form: ILoginForm) => Promise<void>;
//     logout: () => void;
// }

// const AuthContext = createContext<AuthContextType>({
//     user: null,
//     isAuthenticated: false,
//     login: async (form: ILoginForm) => {},
//     logout: () => {},
// });


// export function AuthProvider({ children }: { children: React.ReactNode}) {
//     const [user, setUser] = useState<IUser | null>(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const router = useRouter();

//     useEffect(() => {
//         const user = localStorage.getItem("user");
//         if (user) {
//             setUser(JSON.parse(user));
//             setIsAuthenticated(true);
//         } else {
//             setUser(null);
//             setIsAuthenticated(false);
//         }
//     }, []);
    
//         const login = async (form: ILoginForm ) => {
//         const response = await axios.post(
//             `${process.env.NEXT_PUBLIC_API_URL_LOGIN}/users/login`,
//             form
//         );
//         setUser(response.data.user);

//         setIsAuthenticated(true);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         router.push("/home");
//     };

//     const logout = async () => {
//         setUser(null);
//         setIsAuthenticated(false);
//         localStorage.removeItem("user");
//     };

//     return(
//         <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
//             {children}
//             </AuthContext.Provider>
//     );
// }

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     return context;
// }






"use client";

import axios from "axios";
import { IUser } from "../interfaces/IUser";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ILoginForm } from "../interfaces/ILoginForm";

interface AuthContextType {
    user: IUser | null;
    isAuthenticated: boolean;
    login: (form: ILoginForm) => void; // Ajustado
    logout: () => void;
    token: string | null;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login: (form: ILoginForm) => {}, // Ajustado
    logout: () => {},
    isAuthenticated: false,
    token: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token ) {
            setUser(JSON.parse(user));
            setToken(token)
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
        }
    }, []);

    const login = async (form: ILoginForm) => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL_LOGIN}/users/login`,
            form
        );
        setUser(response.data.user);
        setToken(response.data.token);

        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        router.push("/home");
    };

    const logout = async () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.replace("/home");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, token }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};
