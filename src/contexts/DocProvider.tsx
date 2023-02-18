import React from "react";
import * as Y from "yjs";

type TodosYDocContextType = {
    yDoc: Y.Doc;
};

const YDocContext = React.createContext<{ yDoc: Y.Doc }>({} as TodosYDocContextType);

interface YDocProviderProps {
    children: React.ReactNode;
}


// @todo - move this to a hook
const yDoc = new Y.Doc();

const DocProvider = ({ children }: YDocProviderProps) => {    
    return (
        <YDocContext.Provider value={{ yDoc }}>
            {children}
        </YDocContext.Provider>
    );
}

export const useDoc = () => {
    const context = React.useContext(YDocContext);
    if (context === undefined) {
        throw new Error("useYDoc must be used within a YDocProvider");
    }
    return context;
}

export default DocProvider;
