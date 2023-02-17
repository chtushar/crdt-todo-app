import React from "react";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

interface AllProvidersProps {
    children: React.ReactNode;
    initialSupabaseSession?: Session;
}

const AllProviders = ({ children, initialSupabaseSession }: AllProvidersProps) => {
    const supabaseClient = React.useMemo(() => createBrowserSupabaseClient(),[]);

    return (
        <React.Fragment>
            <SessionContextProvider 
                supabaseClient={supabaseClient}
                initialSession={initialSupabaseSession}
            >
                {children}
            </SessionContextProvider>
        </React.Fragment>
    )
};

export default AllProviders;