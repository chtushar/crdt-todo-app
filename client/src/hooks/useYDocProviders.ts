import React from "react";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebsocketProvider } from "y-websocket";

import { Doc } from "yjs";

export const useYDocProviders = <T>(room: string, yDoc: Doc) => {
    const docInitiated = React.useRef(false);
    const indexeddbPersistence = React.useRef<IndexeddbPersistence>();
    const websocketProvider = React.useRef<WebsocketProvider>();


    React.useEffect(() => {
        if (!docInitiated.current && typeof yDoc !== 'undefined') {
            docInitiated.current = true;
            indexeddbPersistence.current = new IndexeddbPersistence(room, yDoc);
            websocketProvider.current = new WebsocketProvider("ws://localhost:1234", room, yDoc);
        }

        return () => {
            docInitiated.current = false;
            indexeddbPersistence.current?.destroy();
            websocketProvider.current?.destroy();
        }
    }, [room, yDoc]);

};