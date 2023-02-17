import React from "react"
import BoardProvider from "../contexts/BoardContext"
import YDocProvider from "../contexts/YDocContext"
import Textarea from "./Textarea"
import Todos from "./Todos"

const Board = () => {
    return (
        <YDocProvider>
            <BoardProvider>
                <Todos />
                <Textarea />
            </BoardProvider>
        </YDocProvider>
    )
}

export default Board