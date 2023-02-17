import React from "react"
import useForceUpdate from "../hooks/useForceUpdate";
import { Array as YArray } from "yjs";
import { useYDoc } from "./YDocContext";
import { useYDocProviders } from "../hooks/useYDocProviders";

export interface Board {
    id: string;
    title: string;
}

type AllBoardsContextType = {
    allBoardsArray: YArray<Board>;
}

const AllBoardsContext = React.createContext<AllBoardsContextType>({} as AllBoardsContextType);

const AllBoardsProvider = ({ children, userId }: any) => {
    const { yDoc } = useYDoc();
    const forceUpdate = useForceUpdate();
    useYDocProviders(userId, yDoc);

    const allBoardsArray = React.useMemo(() => yDoc?.getArray<Board>(userId), [yDoc, userId]);
    
    React.useLayoutEffect(() => {
        allBoardsArray.observe((event) => {
            forceUpdate();
        });
    }, []);


    return (
        <AllBoardsContext.Provider value={{ 
            allBoardsArray 
        }}>
            {children}
        </AllBoardsContext.Provider>
    );
};

export const useAllBoards = () => {
    const context = React.useContext(AllBoardsContext);
    if (context === undefined) {
        throw new Error("useBoard must be used within a BoardProvider");
    }
    return context;
};

export default AllBoardsProvider;
