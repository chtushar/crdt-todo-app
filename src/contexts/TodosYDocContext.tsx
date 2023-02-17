import React from "react";
import * as Y from "yjs";

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

export default YDocProvider;
