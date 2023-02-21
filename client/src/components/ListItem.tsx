import React from 'react'
import { useAtom } from 'jotai'
import clsx from 'clsx'
import { Reorder } from 'framer-motion'

import { keyboardAtom } from '@/atoms/keyboard'
import  { Todo } from '../types'
import AssignUser from './Form/AssignUser'
import Priority from './Form/Priority'
import Status from './Form/Status'
import DateField from './Form/DateField'


interface ListItemProps {
    todo: Todo,
    selected: boolean,
    index: number,
    handleUpdateTodo: (todo: Todo, index: number) => void,
    handleDelete: (index: number) => void,
    onSelect?: (index: number) => void,
    currentUser: { label: string; value: string };
}

const LIST_ITEM_STYLES = {
    default: "p-4 outline-none border border-neutral-200 border-solid rounded-xl",
    focus: "focus-within:border-blue-300"
}


const ListItem = ({
    todo,
    selected,
    index,
    handleUpdateTodo,
    handleDelete,
    onSelect,
    currentUser
}: ListItemProps) => {
    const [keyboard] = useAtom(keyboardAtom)
    const todoItemRef = React.useRef<HTMLLIElement>(null)

    const handleAssignUser = (update: Pick<Todo, 'assigned_user'>) => {
        handleUpdateTodo({
            ...todo,
            ...update
        }, index)
    }

    const handlePriority = (update: Pick<Todo, 'priority'>) => {
        handleUpdateTodo({
            ...todo,
            ...update
        }, index)
    }

    const handleStatus = (update: Pick<Todo, 'status'>) => {
        handleUpdateTodo({
            ...todo,
            ...update
        }, index)
    }

    const handleDate = (update: Pick<Todo, 'date'>) => {
        handleUpdateTodo({
            ...todo,
            ...update
        }, index)
    }

    React.useEffect(() => {
        if (selected && todoItemRef.current === document.activeElement && keyboard.metaKey && keyboard.key === "Backspace") {
            handleDelete(index)
        }
    }, [selected, keyboard,])

    const isFocused = selected && todoItemRef.current === document.activeElement;


    return (
        <Reorder.Item
            value={todo.uid}
            tabIndex={0}
            key={todo.uid} 
            className={clsx(
                LIST_ITEM_STYLES.default,
                LIST_ITEM_STYLES.focus,
            )}
            ref={todoItemRef}
            onFocus={() => onSelect && onSelect(index)}
        > 
        <div className='flex justify-between items-center pb-4 border-b border-dashed border-neutral-200'>
            <span className='text-neutral-600'>
                {todo.title}
            </span>
            <Status
                value={todo.status ?? undefined}
                onChange={handleStatus}
            />
        </div>
        <div className='pt-4 flex items-baseline gap-2'>
            <AssignUser 
                currentUser={currentUser} 
                value={todo.assigned_user ?? ''} 
                onChange={handleAssignUser}  
            />
            <Priority
                value={todo.priority ?? undefined}
                onChange={handlePriority}
            />
            <DateField
                value={todo.date ?? undefined}
                onChange={handleDate}
            />
        </div>
    </Reorder.Item>
    )
}

export default ListItem