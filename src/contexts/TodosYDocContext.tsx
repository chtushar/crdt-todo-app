import React from "react";
import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";

type TodosYDocContextType = {
    todosYDoc: Y.Doc;
};

const YDocContext = React.createContext<{ todosYDoc: Y.Doc }>({} as TodosYDocContextType);

interface YDocProviderProps {
    children: React.ReactNode;
}

// @todo - move this to a hook

const todosYDoc = new Y.Doc();


const YDocProvider = ({ children }: YDocProviderProps) => {    
    return (
        <YDocContext.Provider value={{ todosYDoc }}>
            {children}
        </YDocContext.Provider>
    );
}

export const useTodosYDoc = () => {
    const context = React.useContext(YDocContext);
    if (context === undefined) {
        throw new Error("useYDoc must be used within a YDocProvider");
    }
    return context;
}

export const useTodosYDocProviders = (boardName: string, yDoc: Y.Doc) => {
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
