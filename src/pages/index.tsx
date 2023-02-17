import React from "react"
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import type { GetServerSidePropsContext } from "next"
import axios from "axios"

export default function Home() {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    // @todo Fix type error
    // @ts-ignore
    const email = event.target.email.value
    await axios.post("/api/auth/send_magic_link", {
      email,
    })
  }
  return (
    <>
      <main>
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input type="email" name="email" />
          <button type="submit">Send Magic link</button>
        </form>
      </main>
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(context);
  const {
      data: { session }
  } = await supabase.auth.getSession();

  if (session)
      return {
          redirect: {
          destination: '/boards',
          permanent: false
      }
  };

  return {
      props: {
          initialSession: session,
      }
  };
}