import React from "react"
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import type { GetServerSidePropsContext } from "next"
import axios from "axios"
import Todos from "@/components/Todos"

const Boards = ({ user }:{ user: User & { username: string } }) => {

    const handleSignOut = async (event: React.MouseEvent) => {
        event.preventDefault()
        await axios.get("/api/auth/sign_out")
    }

    return (
        <>
            <div className="w-full">
                {/* {user.id} */}
                <div className="w-full h-full flex flex-col gap-8">
                    <Todos boardId="todos" username={user.username} />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const supabase = createServerSupabaseClient(context);
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (session?.user) {
        const { data } = await supabase.from('user_settings').select('*').eq('id', session.user.id);
        
        if (Array.isArray(data) && data?.length === 0) {
          const { data: d, error} = await supabase.from('user_settings').insert({
            id: session.user.id,
            is_onboarded: false,
          });

          return {
            props: {
              initialSession: session,
              is_onboarded: false,
            }
          }
        } else if (data && !data[0].is_onboarded) {
          return {
            redirect: {
              destination: '/',
              permanent: false
            }
          }
        }
    
        return {
            props: {
                initialSession: session,
                user: {...session.user, ...(data ? data[0] : {}) }
            }
        };
    }

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