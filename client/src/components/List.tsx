import React from 'react'
import type { Todo,TodoStatus } from '../types'
import ListItem from './ListItem'
import { Reorder } from 'framer-motion'

export interface ListProps {
    todos: Todo[];
    selectedIndex: number;
    handleUpdateTodo: (todo: Todo, index: number) => void;
    handleDelete: (index: number) => void;
    handleSelect: (index: number) => void;
    currentUser: { label: string; value: string };
}

const List = React.forwardRef(({ 
        todos,
        selectedIndex,
        handleUpdateTodo,
        handleDelete: handleDeleteTodo,
        handleSelect,
        currentUser
    }: ListProps, ref) => {
    return (
        <Reorder.Group 
            values={todos.map((todo) => todo.uid)} 
            onReorder={() => null} ref={ref as React.RefObject<HTMLUListElement>}
            className="flex flex-col gap-4"
        >
            {todos.map((todo: Todo, index: number) => {
                return (
                    <ListItem
                        key={todo.uid}
                        todo={todo}
                        selected={index === selectedIndex}
                        index={index}
                        handleUpdateTodo={handleUpdateTodo}
                        handleDelete={handleDeleteTodo}
                        onSelect={handleSelect}
                        currentUser={currentUser}
                    />
                )
            })}
        </Reorder.Group>
    )
})

List.displayName = 'TodoList'

export default List
