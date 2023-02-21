import { supabase } from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function SingOut(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Cache-Control', 'no-store')
    if (req.method === 'GET') {
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: 'Something went wrong' });
        }
        
        res.status(200).json({ success: true, message: "Signed out" });
    }

    res.status(404).json({ success: false, error: 'Not found' });
}
