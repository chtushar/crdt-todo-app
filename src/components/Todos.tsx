import React from "react"
import Form from "./Form"
import { nanoid } from "nanoid"
import useDocArray from "@/contexts/useDocArray"
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import clsx from "clsx";


enum TodoStatus {
    Todo = 'todo',
    Done = 'done'
} 
interface Todo {
    id: string;
    title: string;
    order: number;
    status: TodoStatus;
    boardId: string;
}

const Todos = ({ boardId }: { boardId: string }) => {
    const { selectedIndex, ref, reset } = useKeyboardNavigation({
        enabled: true,
        defaultSelectedIndex: -1,
    })
    const array = useDocArray<Todo>(boardId)
    const handleAddTodo = (title: string) => {
        if (title === '') return
        const payload = {
            id: nanoid(10),
            title,
            order: 0,
            boardId,
            status: TodoStatus.Todo
        }
        array.push([payload]);
    }

    const todos = React.useMemo(() => {
        return array.toArray();
    }, [array.length]);

    React.useEffect(() => {
        reset()
    }, [boardId])

    return (
        <>
            <Form onSubmit={handleAddTodo} />
            <ul ref={ref as React.RefObject<HTMLUListElement>}>
                {todos.map((todo: Todo, index: number) => {
                    return (
                        <li key={todo.id} className={clsx(selectedIndex === index && "bg-rose-200")}>
                            {todo.title}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Todos