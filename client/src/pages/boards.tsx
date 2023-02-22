import React from "react"
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import type { GetServerSidePropsContext } from "next"
import Todos from "@/components/Todos"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { useSupabaseClient } from "@supabase/auth-helpers-react"


const Boards = ({ user, initialSession }:{ user: User & { username: string; is_onboarded: boolean }; initialSession: any }) => {
    const router = useRouter()
    const supabase = useSupabaseClient()

    const handleSignOut = async (event: React.MouseEvent) => {
        event.preventDefault()
        try {
            await supabase.auth.signOut()
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSetUsername = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
          const data = new FormData(event.target as HTMLFormElement)
          const username = data.get('username')
          await supabase.from('user_settings').update({
            username,
            is_onboarded: true,
          }).eq('id', initialSession.user.id);
          location.reload()
        } catch (error) {
          // Sentry goes here in production
          console.log(error)
        }
    }

    return (
        <>
            <div className="w-full">
                {!user?.is_onboarded && <div className="w-full h-full flex flex-col justify-center items-center">
                    <form className="form-card" onSubmit={handleSetUsername}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="input-text"
                            required
                        />
                        <button type="submit" className="primary-btn self-stretch">Set Username</button>
                    </form>
                </div>}
                {user?.is_onboarded && <div className="w-full h-full flex flex-col gap-8">
                    <button 
                        tabIndex={-1} 
                        className="flex gap-2 items-center p-2 self-end rounded-md bg-red-100 text-red-600"
                        onClick={handleSignOut}
                    >
                        <ArrowRightOnRectangleIcon className="w-5 h-5" /> 
                        <span className="text-md">
                            Logout
                        </span>
                    </button>
                    <Todos boardId="todos" username={user?.username} />
                </div>}
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
          await supabase.from('user_settings').insert({
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
            props: {
                initialSession: session,
                is_onboarded: false,
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