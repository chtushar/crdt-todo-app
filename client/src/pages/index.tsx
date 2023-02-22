import React from "react"
import { useRouter } from "next/router"
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import type { GetServerSidePropsContext } from "next"
import axios from "axios"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import clsx from "clsx"

const FORM_STYLES = {
  default: "p-4 w-fit h-fit flex flex-col items-center gap-2 shadow-md border border-neutral-200 rounded-md"
}

const INPUT_STYLES = {
  default: "border border-neutral-200 p-2 rounded-md"
}

export default function Home({ initialSession }: { initialSession: any }) {
  const router = useRouter()
  const supabase = useSupabaseClient();
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)
    const email = data.get('email')
    try {
      await axios.post("/api/auth/send_magic_link", {
        email,
      })
    } catch (error) {
      // Sentry goes here in production
      console.log(error)
    }
  }

  const handleSetUsername = async (event: React.FormEvent) => {
    try {
      const data = new FormData(event.target as HTMLFormElement)
      const username = data.get('username')
      await supabase.from('user_settings').update({
        username,
        is_onboarded: true,
      }).eq('id', initialSession.user.id);
      router.push('/boards')
    } catch (error) {
      // Sentry goes here in production
      console.log(error)
    }
  }

  return (
    <>
      <main className="w-full flex flex-col justify-center items-center">
        {initialSession?.user ? 
          <form className={clsx(
            FORM_STYLES.default,
          )} onSubmit={handleSetUsername}>
            <input 
              type="text" 
              name="username" 
              className={clsx(
                INPUT_STYLES.default,
              )} 
            />
            <button type="submit">Submit</button>
          </form> 
        : (
          <form className={clsx(
            FORM_STYLES.default,
          )} onSubmit={handleSubmit}>
            <input 
              type="email" 
              name="email"
              className={clsx(
                INPUT_STYLES.default,
              )} 
            />
            <button type="submit">Send Magic link</button>
          </form>
        )}
      </main>
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
      const { error} = await supabase.from('user_settings').insert({
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
        redirect: {
          destination: '/boards',
          permanent: false
        }
    };
  }

  return {
      props: {
          initialSession: session,
      }
  };
}