import React from 'react'
import { useAtom } from 'jotai'
import clsx from 'clsx'
import { Reorder } from 'framer-motion'

import { keyboardAtom } from '@/atoms/keyboard'
import  { Todo, TodoStatus } from '../types'

interface ListItemProps {
    todo: Todo,
    selected: boolean,
    index: number,
    toggleCheckbox: (todo: Todo, index: number) => void,
    handleDelete: (index: number) => void,
    onSelect?: (index: number) => void,
}


const ListItem = ({
    todo,
    selected,
    index,
    toggleCheckbox,
    handleDelete,
    onSelect
}: ListItemProps) => {
    const [keyboard] = useAtom(keyboardAtom)
    const todoItemRef = React.useRef<HTMLLIElement>(null)

    React.useEffect(() => {
        if (selected && todoItemRef.current === document.activeElement && keyboard.metaKey && keyboard.key === "Backspace") {
            handleDelete(index)
        }
        if (selected && todoItemRef.current === document.activeElement && keyboard.key === "Enter") {
            console.log('enter', todo, index)
            toggleCheckbox(todo, index)
        }
    }, [selected, keyboard])

    return (
        <Reorder.Item
            value={todo.uid}
            tabIndex={0}
            key={todo.uid} 
            className={clsx(
                "flex justify-between items-center p-4 border border-neutral-100 border-solid rounded-xl",
            )}
            ref={todoItemRef}
            onFocus={() => onSelect && onSelect(index)}
        > 
            <span className='text-neutral-600'>
                {todo.title}
            </span>
        <span>
            <input
                tabIndex={-1}
                type="checkbox" 
                name="status" 
                checked={todo.status === TodoStatus.Done}
                onChange={() => toggleCheckbox(todo, index)}
            />
        </span>
    </Reorder.Item>
    )
}

export default ListItem