import React from "react"
import useForceUpdate from "../hooks/useForceUpdate";
import { useYDoc, useYDocProviders } from "./YDocContext";

export interface Board {
    id: number;
    title: string;
}

type AllBoardsContextType = {
    board: Board[] | null;
    dispatch: React.Dispatch<any>;
    allBoardsArray: any;
}

const AllBoardsContext = React.createContext<AllBoardsContextType>({
    board: null,
    dispatch: () => null,
    allBoardsArray: []
});

const reducer = (state: Board[], action: any) => {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];
        case "REMOVE":
            return state.filter((todo: Board) => todo.id !== action.payload);
        default:
            return state;
    }
}

const AllBoardsProvider = ({ children, userId }: any) => {
    const [board, dispatch] = React.useReducer(reducer, []);
    const { yDoc } = useYDoc();
    const forceUpdate = useForceUpdate();
    useYDocProviders(userId, yDoc);

    const allBoardsArray = React.useMemo(() => yDoc?.getArray(userId), [yDoc, userId]);
    
    React.useLayoutEffect(() => {
        allBoardsArray.observe((event) => {
            console.log('boardArray event', event);
            forceUpdate();
        });
    }, []);


    return (
        <AllBoardsContext.Provider value={{ 
            board, 
            dispatch,
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
