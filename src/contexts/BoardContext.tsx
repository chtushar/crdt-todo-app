import React from "react"
import useForceUpdate from "../hooks/useForceUpdate";
import { useYDoc, useYDocProviders } from "./YDocContext";

const boardName = 'yjs-todos';

export interface Todo {
    id: number;
    title: string;
}

type BoardContextType = {
    board: Todo[] | null;
    dispatch: React.Dispatch<any>;
    boardArray: any;
}

const BoardContext = React.createContext<BoardContextType>({
    board: null,
    dispatch: () => null,
    boardArray: []
});

const reducer = (state: Todo[], action: any) => {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, action.payload];
        case "REMOVE_TODO":
            return state.filter((todo: Todo) => todo.id !== action.payload);
        default:
            return state;
    }
}

const BoardProvider = ({ children }: any) => {
    const [board, dispatch] = React.useReducer(reducer, []);
    const { yDoc } = useYDoc();
    const forceUpdate = useForceUpdate();
    useYDocProviders(boardName, yDoc);

    const boardArray = React.useMemo(() => yDoc?.getArray(boardName), [yDoc]);
    
    React.useLayoutEffect(() => {
        boardArray.observe((event) => {
            console.log('boardArray event', event);
            forceUpdate();
        });
    }, []);


    return (
        <BoardContext.Provider value={{ 
            board, 
            dispatch,
            boardArray 
        }}>
            {children}
        </BoardContext.Provider>
    );
};

export const useBoard = () => {
    const context = React.useContext(BoardContext);
    if (context === undefined) {
        throw new Error("useBoard must be used within a BoardProvider");
    }
    return context;
};

export default BoardProvider;
