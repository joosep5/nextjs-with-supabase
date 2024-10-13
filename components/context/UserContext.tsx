// components/context/UserContext.tsx
"use client";  // Lisatud märge, et komponent töötaks kliendi poolel

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";  // Impordi oma Supabase kliendi loomiseks

// 1. Defineeri UserContext
const UserContext = createContext(null);

// 2. Loo UserProvider komponent, mis haldab kasutajateavet
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null); // Kasutaja olek
    const supabase = createClient();

    useEffect(() => {
        // 3. Funktsioon kasutaja info saamiseks Supabase'st
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (!error) {
                setUser(user);  // Salvesta kasutaja andmed olekusse
            }
        };

        getUser();  // Hangi kasutaja andmed komponenti laadiamisel
    }, []); // Tühja sõltuvusarray tähendab, et see käivitub ainult üks kord

    return (
        // 4. Paku UserContext-i väärtust rakenduse lastele
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

// 5. Loo custom hook UserContext-i kasutamiseks
export const useUser = () => useContext(UserContext);
