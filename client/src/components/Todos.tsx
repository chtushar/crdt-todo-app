import React from "react"
import { nanoid } from "nanoid"
import { useUser } from "@supabase/auth-helpers-react";
import useDocArray from "@/contexts/useDocArray"
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

import { Todo, TodoStatus } from '../types';
import List from "./List";
import dynamic from "next/dynamic";
import Filters, { FiltersProps } from "./Filters";

const Form = dynamic(() => import('./Form/Form'), { ssr: false })

const Todos = ({ boardId, username }: { boardId: string; username: string }) => {
    const { array, yDoc } = useDocArray<Todo>(`${boardId}`)
    const textbarRef = React.useRef<HTMLInputElement>(null)
    const user = useUser();
    
    const handleAddTodo = ({
        title,
        assigned_user,
        priority,
        date
    }: Pick<Todo, 'title' | 'assigned_user' | 'priority' | 'date'> ) => {
        if (title === '') return
        const payload = {
            uid: nanoid(10),
            title,
            boardId,
            status: TodoStatus.Todo,
            assigned_user: assigned_user ?? null,
            priority: priority ?? null,
            date: date ?? null,
        }
        array.push([payload]);
    }
    
    const handleDeleteTodo = (index: number) => {
        array.delete(index)
    }
    
    const toggleCheckbox = (todo: Todo) => {
        const oldTodo = array.toArray().find(t => t.uid === todo.uid) as Todo
        const newTodo = {
            ...oldTodo,
            status: todo.status === TodoStatus.Todo ? TodoStatus.Done : TodoStatus.Todo
        }
        
        yDoc.transact(() => {
            array.delete(todo.index as number)
            array.insert((todo.index as number) , [newTodo])
        })

        document.activeElement && (document.activeElement as HTMLElement).blur()
    }
    
    const [filters, setFilters] = React.useState<FiltersProps['filters']>({ 
        status: TodoStatus.Todo,
        priority: undefined,
        assigned_user: undefined 
    })
    const todos = array.toArray().map((todo, index) => ({ ...todo, index }));
    

    const { selectedIndex, ref, reset, handleSelect } = useKeyboardNavigation({
        enabled: true,
        defaultSelectedIndex: -1,
        onEnter: (index: number) => {
            if (textbarRef.current !== document.activeElement) {
                const todo = todos[index]
                toggleCheckbox(todo)
            }
        }
    })

    const sortedTodos = React.useMemo(() => {
        const filteredTodos = todos.filter(todo => {
            if (filters.status && todo.status !== filters.status) return false
            if (filters.priority && todo.priority !== filters.priority) return false
            if (filters.assigned_user && todo.assigned_user !== filters.assigned_user) return false
            return true
        })
        return filteredTodos.sort((a, b) => {
            if (a.status === TodoStatus.Todo && b.status === TodoStatus.Done) return -1
            if (a.status === TodoStatus.Done && b.status === TodoStatus.Todo) return 1
            if (a.priority && b.priority) {
                if (a.priority > b.priority) return -1
                if (a.priority < b.priority) return 1
            }
            if (a.date && b.date) {
                if (a.date > b.date) return 1
                if (a.date < b.date) return -1
            }
            return 0
        })
    }, [todos, filters])

    return (
        <>
            {/* <Form
                onSubmit={handleAddTodo}
                textbarRef={textbarRef}
            /> */}
                <Form 
                    username={username}
                    userId={user?.id ?? ''}
                    handleAddTodo={handleAddTodo} 
                />
            <div className="flex flex-col gap-2">
                <Filters 
                    filters={filters}
                    setFilters={setFilters}
                    currentUser={{ label: username, value: user?.id ?? '' }} 
                />
                <List
                todos={sortedTodos}
                selectedIndex={selectedIndex}
                toggleCheckbox={toggleCheckbox}
                handleDelete={handleDeleteTodo}
                handleSelect={handleSelect}
                ref={ref}   
                />
            </div>
        </>
    )
}


export default Todos