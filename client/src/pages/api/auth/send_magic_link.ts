import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

const sendMagicLink = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.email) {
    return res.status(400).json({ success: false, error: 'Email is required' })
  }

    if (req.method === 'POST') {
      try {
        await supabase.auth.signInWithOtp({ 
            email: req.body.email,
            options: {
                emailRedirectTo: 'http://localhost:3000/',
            }
        })
    
        res.status(200).json({ success: true, message: 'Check your email for the login link.' })
      } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: 'Something went wrong' })
      }
    } else {
        res.status(404).json({ success: false, error: 'Not found' })
    }
}

export default sendMagicLink