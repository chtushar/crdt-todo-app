import React from "react"
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import type { GetServerSidePropsContext } from "next"

const Boards = ({ user }:{ user: User }) => {

    return (
        <div>
            <h1>Boards</h1>
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