import React from 'react'
import { Todo, useBoard } from '../contexts/BoardContext'

const Todos = () => {
    const { board, boardArray } = useBoard()

    const handleRemove = (index: number) => {
        boardArray.delete(index, 1)
    }

    return (
        <div>
            {boardArray?.toArray().map((todo: Todo, index: number) => (
                <div key={todo.id} onClick={() => handleRemove(index)} >{todo.title}</div>
            ))}
        </div>   
    )
}

export default Todos