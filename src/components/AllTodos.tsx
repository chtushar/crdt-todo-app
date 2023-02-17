import React from 'react'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import { Todo, useBoard } from '@/contexts/BoardContext'
import useForceUpdate from "@/hooks/useForceUpdate"

const AllTodos = () => {
    const { boardArray } = useBoard()
    const forceUpdate = useForceUpdate()

    React.useLayoutEffect(() => {
        boardArray.observe(() => {
            forceUpdate()
        });
    }, []);

    const handleAddBoard = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // @todo Fix type error
        //@ts-ignore
        const title = e.currentTarget[0].value;
        const payload = {
            id: nanoid(10),
            title
        }
        boardArray.push([payload]);
    }

    return (
        <ul>
            {boardArray.toArray().map((board: Todo) => {
                return (
                    <li key={board.id}>
                        <Link href={`/boards/${board.id}`}>
                            {board.title}
                        </Link>
                    </li>
                )              
            })}
            <li>
                <form className="flex gap-2" onSubmit={handleAddBoard}>
                    <input className="border border-neutral-200" type="text" />
                    <button type="submit">Add Task</button>
                </form>
            </li>
        </ul>
    )
}

export default AllTodos
