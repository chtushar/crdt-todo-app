import { supabase } from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        supabase.from('user_settings')
            .select('*').then(({ data, error }) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: error.message });
            } else {
                res.status(200).json(data);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}