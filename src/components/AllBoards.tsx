import { useAllBoards, Board } from "@/contexts/AllBoardsContext"
import useForceUpdate from "@/hooks/useForceUpdate"
import { nanoid } from "nanoid"
import Link from "next/link"
import React from "react"

const AllBoard = () => {
    const { allBoardsArray } = useAllBoards()
    const forceUpdate = useForceUpdate()
    
    React.useLayoutEffect(() => {
        allBoardsArray.observe(() => {
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
        allBoardsArray.push([payload]);
    }

    return (
        <ul>
            {allBoardsArray.toArray().map((board: Board) => {
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
                    <button type="submit">Add Board</button>
                </form>
            </li>
        </ul>
    )
}

export default AllBoard