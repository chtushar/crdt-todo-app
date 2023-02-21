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

    const handleUpdateTodo = (todo: Todo) => {
        const oldTodo = array.toArray().find(t => t.uid === todo.uid) as Todo
        const newTodo = {
            ...oldTodo,
            ...todo
        }
        yDoc.transact(() => {
            array.delete(todo.index as number)
            array.insert((todo.index as number) , [newTodo])
        })
    }
    
    const { selectedIndex, ref, handleSelect } = useKeyboardNavigation({
        enabled: true,
        defaultSelectedIndex: -1,
    })
    
    const [filters, setFilters] = React.useState<FiltersProps['filters']>({ 
        status: TodoStatus.Todo,
        priority: undefined,
        assigned_user: undefined 
    })
    
    const todos = array.toArray().map((todo, index) => ({ ...todo, index }));
    
    const sortedTodos = React.useMemo(() => {
        const filteredTodos = todos.filter(todo => {
            if (filters.status && todo.status !== filters.status) return false
            if (filters.priority && todo.priority !== filters.priority) return false
            if (filters.assigned_user && todo.assigned_user !== filters.assigned_user) return false
            return true
        })
        return filteredTodos
    }, [todos, filters])

    const currentUser = { label: username, value: user?.id ?? '' }

    return (
        <>
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
                    todos={[...sortedTodos]}
                    ref={ref}
                    currentUser={currentUser}
                    selectedIndex={selectedIndex}
                    handleUpdateTodo={handleUpdateTodo}
                    handleDelete={handleDeleteTodo}
                    handleSelect={handleSelect}
                />
            </div>
        </>
    )
}


export default Todos