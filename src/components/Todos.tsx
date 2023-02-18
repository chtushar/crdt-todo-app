import React from "react"
import Form from "./Form"
import { nanoid } from "nanoid"
import useDocArray from "@/contexts/useDocArray"

interface Todo {
    id: string;
    title: string;
    order: number;
}

const Todos = ({ boardId }: { boardId: string }) => {
    const array = useDocArray<Todo>(boardId)
    const handleAddTodo = (title: string) => {
        if (title === '') return
        const payload = {
            id: nanoid(10),
            title,
            order: 0,
            boardId,
        }
        array.push([payload]);
    }

    const todos = React.useMemo(() => {
        return array.toArray();
    }, [array.length]);

    return (
        <>
            <Form onSubmit={handleAddTodo} />
            {todos.map((todo: Todo) => {
                return (
                    <div key={todo.id}>
                        {todo.title}
                    </div>
                )
            })}
        </>
    )
}

export default Todos