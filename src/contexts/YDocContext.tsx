import React from "react";
import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";

type YDocContextType = {
    yDoc: Y.Doc;
};

const YDocContext = React.createContext<{ yDoc: Y.Doc }>({} as YDocContextType);

interface YDocProviderProps {
    children: React.ReactNode;
}

// @todo - move this to a hook

const yDoc = new Y.Doc();


const YDocProvider = ({ children }: YDocProviderProps) => {    
    return (
        <YDocContext.Provider value={{ yDoc }}>
            {children}
        </YDocContext.Provider>
    );
}

export const useYDoc = () => {
    const context = React.useContext(YDocContext);
    if (context === undefined) {
        throw new Error("useYDoc must be used within a YDocProvider");
    }
    return context;
}

export const useYDocProviders = (boardName: string, yDoc: Y.Doc) => {
    const docInitiated = React.useRef(false);
    const indexeddbPersistence = React.useRef<IndexeddbPersistence>();
    const webrtcProvider = React.useRef<WebrtcProvider>();

    React.useLayoutEffect(() => {
        if (!docInitiated.current) {
            docInitiated.current = true;
            indexeddbPersistence.current = new IndexeddbPersistence(boardName, yDoc);
            webrtcProvider.current = new WebrtcProvider(boardName, yDoc, { signaling: ["wss://signaling.yjs.dev"] });
        }
    }, []);

};

export default YDocProvider;
