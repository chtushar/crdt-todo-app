import { initSupabase } from "@/lib/y-supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";

import { Doc } from "yjs";

export const useYDocProviders = <T>(room: string, yDoc: Doc) => {
    const supabase = useSupabaseClient();
    const docInitiated = React.useRef(false);
    const indexeddbPersistence = React.useRef<IndexeddbPersistence>();
    const webrtcProvider = React.useRef<WebrtcProvider>();

    React.useLayoutEffect(() => {
        if (!docInitiated.current && typeof yDoc !== 'undefined') {
            docInitiated.current = true;
            indexeddbPersistence.current = new IndexeddbPersistence(room, yDoc);
            webrtcProvider.current = new WebrtcProvider(room, yDoc, { signaling: ["ws://localhost:4444"] });
            var destroy = initSupabase<T>(yDoc.getArray<T>(room), supabase, () => {
                console.log("Supabase initialized");
            })
        }

        return () => {
            docInitiated.current = false;
            indexeddbPersistence.current?.destroy();
            webrtcProvider.current?.destroy();
            destroy();
        }
    }, [room, yDoc]);

};