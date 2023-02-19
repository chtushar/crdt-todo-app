import React, { useState } from "react"
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
    uid: string;
    title: string;
    order: number;
    status: TodoStatus;
    boardId: string;
}

const Todos = ({ boardId }: { boardId: string }) => {
    const { array, yDoc } = useDocArray<Todo>(boardId)
    const textbarRef = React.useRef<HTMLInputElement>(null)
    const [enableBoard, setEnableBoard] = useState<boolean>(false)
    
    const handleAddTodo = (title: string) => {
        if (title === '') return
        const payload = {
            uid: nanoid(10),
            title,
            order: 0,
            boardId,
            status: TodoStatus.Todo
        }
        array.push([payload]);
    }
    
    const handleDeleteTodo = (index: number) => {
        array.delete(index)
    }
    
    const toggleCheckbox = (todo: Todo, index: number) => {
        const oldTodo = array.get(index)
        const newTodo = {
            ...oldTodo,
            status: todo.status === TodoStatus.Todo ? TodoStatus.Done : TodoStatus.Todo
        }
        
        yDoc.transact(() => {
            array.delete(index)
            array.insert(index, [newTodo])
        })
    }
    
    const todos = array.toArray()
    
    const { selectedIndex, ref, reset } = useKeyboardNavigation({
        enabled: true,
        defaultSelectedIndex: -1,
        onEnter: (index: number) => {
            // @TODO: Fix wrong behaviour
            if (textbarRef.current?.value === '') {
                const todo = todos[index]
                toggleCheckbox(todo, index)
            }
        }
    })

    React.useEffect(() => {
        reset()
    }, [boardId])

    return (
        <>
            <Form
                onSubmit={handleAddTodo}
                textbarRef={textbarRef}
            />
            <ul ref={ref as React.RefObject<HTMLUListElement>}>
                {todos.map((todo: Todo, index: number) => {
                    return (
                        <li 
                            tabIndex={-1}
                            key={todo.uid} 
                            className={clsx(
                                selectedIndex === index && "bg-rose-200",
                                "flex justify-between items-center"
                            )}
                        >
                            <span>
                                {todo.title}
                            </span>
                            <span>
                                <button tabIndex={-1} onClick={() => handleDeleteTodo(index)}>
                                    Delete
                                </button>
                                <input
                                    tabIndex={-1}
                                    type="checkbox" 
                                    name="status" 
                                    checked={todo.status === TodoStatus.Done}
                                    onChange={() => toggleCheckbox(todo, index)}
                                />
                            </span>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Todos