import React from "react";
import { useBoard } from "../contexts/BoardContext";

const Textarea = () => {
    const [text, setText] = React.useState<string>("");
    const { dispatch, boardArray } = useBoard();

    const handleAddTodo = () => {
        const payload = {
            id: Math.random(),
            title: text
        }
        
        dispatch({
            type: "ADD_TODO",
            payload
        });

        boardArray.push([payload]);
        setText("");
    }
    
    return (
        <div>
            <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleAddTodo}>Add Todo</button>
        </div>
    )
}

export default Textarea;