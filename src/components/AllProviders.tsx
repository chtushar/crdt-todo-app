import React from "react";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import Layout from "./Layout";
// import YDocProvider from "@/contexts/YDocContext";

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
                <Layout>
                {/* <YDocProvider> */}
                    {children}
                {/* </YDocProvider> */}
                </Layout>
            </SessionContextProvider>
        </React.Fragment>
    )
};

export default AllProviders;