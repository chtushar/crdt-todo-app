import React from "react";
import * as Y from "yjs";

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

export default YDocProvider;
