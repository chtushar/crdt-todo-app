import React from "react"
import { useAtom } from "jotai"
import { nanoid } from "nanoid"
import clsx from "clsx"

import { keyboardAtom } from "@/atoms/keyboard"
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation"
import AddBoardModal from "./AddBoardModal"
import Todos from "./Todos"
import useDocArray from "@/contexts/useDocArray"

interface Board {
    uid: string;
    title: string;
}

const AllBoard = ({ userId }:{ userId: string }) => {
    const { array } = useDocArray<Board>(userId);
    const [keyboard] = useAtom(keyboardAtom);

    const handleAddBoard = (title: string) => {
        if (title.length === 0) {
            return ;
        }
        const payload = {
            uid: nanoid(10),
            title
        }
        array.push([payload]);
    }

    const handleDeleteBoard = (index: number) => {
        array.delete(index);
    }
    
    const boards = array.toArray();
    
    const { ref, selectedIndex, handleSelect } = useKeyboardNavigation({
        enabled: keyboard.metaKey === true,
        nextKey: "ArrowRight",
        prevKey: "ArrowLeft",
    });
    
    return (
        <div className="w-full h-full flex flex-col gap-8 overflow-clip">
            <div className="relative">
                <AddBoardModal onSubmit={handleAddBoard} />
                <div className="inline-block ml-14 w-full overflow-auto scrollbar-hide">
                    <ul ref={ref as React.RefObject<HTMLUListElement>} className="w-full flex flex-row gap-1 whitespace-nowrap">
                        {boards.map((board: Board, index: number) => {
                            return (
                                <li key={board.uid}>
                                    <Pill 
                                        selected={index === selectedIndex} 
                                        onClick={() => handleSelect(index)}
                                        onDoubleClick={() => handleDeleteBoard(index)}
                                    >
                                        {board.title}
                                    </Pill>
                                </li>
                            )              
                        })}
                    </ul>
                </div>
            </div>
            {typeof boards[selectedIndex] !== 'undefined' && (
                <Todos boardId={boards[selectedIndex].uid} />
            )}
        </div>
    )
}

const Pill = ({ 
        children, 
        selected = false, 
        onClick,
        onDoubleClick
    }:{ 
        children: React.ReactNode; 
        selected?: boolean; 
        onClick: React.HTMLAttributes<HTMLButtonElement>['onClick'];
        onDoubleClick: React.HTMLAttributes<HTMLButtonElement>['onDoubleClick']; 
    }) => {
    return (
        <button
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            className={clsx(
                "m-1 px-4 py-2 text-center rounded-full text-neutral-500 whitespace-nowrap",
                selected && "bg-rose-50 text-neutral-800"
            )}
            tabIndex={-1}
        >
            {children}
        </button>
    )
}


export default AllBoard