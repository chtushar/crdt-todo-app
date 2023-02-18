import React from "react";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";
import { Doc } from "yjs";

export const useYDocProviders = (room: string, yDoc: Doc) => {
    const docInitiated = React.useRef(false);
    const indexeddbPersistence = React.useRef<IndexeddbPersistence>();
    const webrtcProvider = React.useRef<WebrtcProvider>();

    React.useLayoutEffect(() => {
        if (!docInitiated.current && typeof yDoc !== 'undefined') {
            docInitiated.current = true;
            indexeddbPersistence.current = new IndexeddbPersistence(room, yDoc);
            webrtcProvider.current = new WebrtcProvider(room, yDoc, { signaling: ["wss://signaling.yjs.dev"] });
        }

        return () => {
            docInitiated.current = false;
            indexeddbPersistence.current?.destroy();
            webrtcProvider.current?.destroy();
        }
    }, [room, yDoc]);

};