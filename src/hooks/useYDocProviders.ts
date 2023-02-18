import React from "react";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";
import { SupabaseProvider } from "@/lib/y-supabase";
import { Doc } from "yjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const useYDocProviders = (room: string, yDoc: Doc) => {
    const supabase = useSupabaseClient();
    const docInitiated = React.useRef(false);
    const indexeddbPersistence = React.useRef<IndexeddbPersistence>();
    const webrtcProvider = React.useRef<WebrtcProvider>();
    const supabaseProvider = React.useRef<SupabaseProvider>();

    React.useLayoutEffect(() => {
        if (!docInitiated.current && typeof yDoc !== 'undefined') {
            docInitiated.current = true;
            indexeddbPersistence.current = new IndexeddbPersistence(room, yDoc);
            webrtcProvider.current = new WebrtcProvider(room, yDoc, { signaling: ["wss://signaling.yjs.dev"] });
            supabaseProvider.current = new SupabaseProvider(room, yDoc, { client: supabase });
        }

        return () => {
            docInitiated.current = false;
            indexeddbPersistence.current?.destroy();
            webrtcProvider.current?.destroy();
            supabaseProvider.current?.destory();
        }
    }, [room, yDoc, supabase]);

};