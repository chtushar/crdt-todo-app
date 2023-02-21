import React from 'react'
import type { Todo,TodoStatus } from '../types'
import ListItem from './ListItem'
import { Reorder } from 'framer-motion'

export interface ListProps {
    todos: Todo[];
    selectedIndex: number;
    toggleCheckbox: (todo: Todo, index: number) => void;
    handleDelete: (index: number) => void;
    handleSelect: (index: number) => void;
}

const List = React.forwardRef(({ 
        todos,
        selectedIndex,
        toggleCheckbox,
        handleDelete: handleDeleteTodo,
        handleSelect
    }: ListProps, ref) => {
    return (
        <Reorder.Group 
            values={todos.map((todo) => todo.uid)} 
            onReorder={() => null} ref={ref as React.RefObject<HTMLUListElement>}
            className="flex flex-col gap-2"
        >
            {todos.map((todo: Todo, index: number) => {
                return (
                    <ListItem
                        key={todo.uid}
                        todo={todo}
                        selected={index === selectedIndex}
                        index={index}
                        toggleCheckbox={toggleCheckbox}
                        handleDelete={handleDeleteTodo}
                        onSelect={handleSelect}
                    />
                )
            })}
        </Reorder.Group>
    )
})

List.displayName = 'TodoList'

export default List
