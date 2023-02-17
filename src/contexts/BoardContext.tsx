import React from "react"
import useForceUpdate from "../hooks/useForceUpdate";
import { Array as YArray } from "yjs";
import { useTodosYDoc } from "./TodosYDocContext";
import { useYDoc } from "./YDocContext";
import { useYDocProviders} from "../hooks/useYDocProviders";

export interface Todo {
    id: string;
    title: string;
}

type BoardContextType = {
    boardArray: YArray<Todo>;
}

const BoardContext = React.createContext<BoardContextType>({} as BoardContextType);

const BoardProvider = ({ children, boardId }: any) => {
    
    const { yDoc } = useYDoc()
    const { todosYDoc } = useTodosYDoc();
    const forceUpdate = useForceUpdate();
    useYDocProviders(boardId, todosYDoc);

    React.useLayoutEffect(() => {
        
    }, [boardId, todosYDoc, yDoc]);
    const boardArray = React.useMemo(() => todosYDoc?.getArray<Todo>(boardId), [todosYDoc, boardId]);


    
    React.useLayoutEffect(() => {
        boardArray.observe((event) => {
            forceUpdate();
        });
    }, []);


    return (
        <BoardContext.Provider value={{
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
