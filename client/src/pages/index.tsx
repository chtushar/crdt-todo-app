import React from "react"
import { useRouter } from "next/router"
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import type { GetServerSidePropsContext } from "next"
import axios from "axios"
import clsx from "clsx"

export default function Home({ initialSession }: { initialSession: any }) {
  const [emailSent, setEmailSent] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = new FormData(event.target as HTMLFormElement)
    const email = data.get('email')
    if (!isLoading) {
      try {
        setIsLoading(true)
        await axios.post("/api/auth/send_magic_link", {
          email,
        })
        setEmailSent(true)
      } catch (error) {
        // Sentry goes here in production
        setIsLoading(false)
        console.log(error)
      }
    }
  }

  return (
    <>
      <main className="w-full flex flex-col justify-center items-center">
        {!emailSent &&
          <form className="form-card" onSubmit={handleSubmit}>
            <input 
              type="email" 
              name="email"
              className="input-text" 
              placeholder="Your Email"
              disabled={isLoading}
              required
            />
            <button type="submit" className="primary-btn self-stretch">{isLoading ? 'Sending...': 'Send Magic link'}</button>
          </form>
        }
        {emailSent &&
          <p className="text-gray-500 text-sm">Please verify through the magic link sent to your email.</p>
        }
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