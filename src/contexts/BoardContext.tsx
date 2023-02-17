import React from "react"
import useForceUpdate from "../hooks/useForceUpdate";
import { useTodosYDoc, useTodosYDocProviders } from "./TodosYDocContext";
import { useYDoc } from "./YDocContext";

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
        case "ADD":
            return [...state, action.payload];
        case "REMOVE":
            return state.filter((todo: Todo) => todo.id !== action.payload);
        default:
            return state;
    }
}

const BoardProvider = ({ children, boardId }: any) => {
    const hasSetBoard = React.useRef(false);
    const [board, dispatch] = React.useReducer(reducer, []);
    const { yDoc } = useYDoc()
    const { todosYDoc } = useTodosYDoc();
    const forceUpdate = useForceUpdate();

    React.useLayoutEffect(() => {
        if (!hasSetBoard.current) {
            yDoc.getMap().set(boardId, todosYDoc);
            hasSetBoard.current = true;
        }
    }, [boardId, todosYDoc, yDoc]);

    useTodosYDocProviders(boardId, todosYDoc);

    const boardArray = React.useMemo(() => todosYDoc?.getArray(boardId), [todosYDoc, boardId]);
    
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
