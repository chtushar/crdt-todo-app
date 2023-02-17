import React from "react"
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import type { GetServerSidePropsContext } from "next"
import axios from "axios"

const Boards = ({ user }:{ user: User }) => {
    
    const handleSignOut = async (event: React.MouseEvent) => {
        event.preventDefault()
        await axios.get("/api/auth/sign_out")
    }

    return (
        <div>
            <div>
                <h1>Boards</h1>
                <button onClick={handleSignOut}>
                    SignOut
                </button>
            </div>
            <p>Hi {user.email}</p>
        </div>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const supabase = createServerSupabaseClient(context);
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session)
        return {
            redirect: {
            destination: '/',
            permanent: false
        }
    };

    return {
        props: {
            initialSession: session,
            user: session.user
        }
    };
}

export default Boards