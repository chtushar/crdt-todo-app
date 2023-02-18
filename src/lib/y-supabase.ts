import { SupabaseClient } from "@supabase/supabase-js"
import { YArray } from "yjs/dist/src/internals"

export const initSupabase = <T>(yArray: YArray<T>, supabase: SupabaseClient, cb: () => void) => {
    yArray.observe((event, transaction) => {
        console.log(event.changes.deleted.size, event.changes.added.size)
    });
    
    return () => {

    }
}