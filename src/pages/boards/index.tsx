import React from "react"
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import type { GetServerSidePropsContext } from "next"
import axios from "axios"
import AllBoards from "@/components/AllBoards"
import AllBoardsProvider from "@/contexts/AllBoardsContext"

const Boards = ({ user }:{ user: User }) => {

    // const handleSignOut = async (event: React.MouseEvent) => {
    //     event.preventDefault()
    //     await axios.get("/api/auth/sign_out")
    // }

    return (
        <>
            {/* <div>
                <h1>Boards</h1>
                <button onClick={handleSignOut}>
                    SignOut
                </button>
            </div> */}
            <div className="w-full">
                {/* <AllBoardsProvider userId={user.id}> */}
                    <AllBoards />
                {/* </AllBoardsProvider> */}
            </div>
        </>
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