import React from "react"
import { useRouter } from "next/router"
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import type { GetServerSidePropsContext } from "next"
import axios from "axios"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function Home({ initialSession }: { initialSession: any }) {
  const router = useRouter()
  const supabase = useSupabaseClient();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)
    const email = data.get('email')
    await axios.post("/api/auth/send_magic_link", {
      email,
    })
  }
  const handleSetUsername = async (event: React.FormEvent) => {
    try {
      const data = new FormData(event.target as HTMLFormElement)
      const username = data.get('username')
      const { error } = await supabase.from('user_settings').update({
        username,
        is_onboarded: true,
      }).eq('id', initialSession.user.id);
      router.push('/boards')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <main>
        {initialSession?.user ? 
          <form className="flex gap-2" onSubmit={handleSetUsername}>
            <input type="text" name="username" />
            <button type="submit">Submit</button>
          </form> 
        : (
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input type="email" name="email" />
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