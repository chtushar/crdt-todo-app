import React from "react"
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation"
import clsx from "clsx"
import { useAtom } from "jotai"
import { keyboardAtom } from "@/atoms/keyboard";
import { nanoid } from "nanoid"
import { useAllBoards, Board } from "@/contexts/AllBoardsContext"
import Form from "./Form";
import Todos from "./Todos";
// import useForceUpdate from "@/hooks/useForceUpdate"
// import Link from "next/link"
// import React from "react"

const items = [
    {
        id: "1",
        title: "Design",
    },
    {
        id: "2",
        title: "Engineering",
    },
    {
        id: "3",
        title: "Product",
    },
    {
        id: "4",
        title: "Marketing",
    },
]

const AllBoard = () => {
    const [keyboard] = useAtom(keyboardAtom)
    const { ref, selectedIndex } = useKeyboardNavigation({
        enabled: keyboard.metaKey === true,
        nextKey: "ArrowRight",
        prevKey: "ArrowLeft",
    });
    // const { handleAddBoard } = useAllBoards()
    // const forceUpdate = useForceUpdate()
    
    // React.useLayoutEffect(() => {
    //     allBoardsArray.observe(() => {
    //         forceUpdate()
    //     });
    // }, []);

    return (
        <div className="w-full flex flex-col justify-center align-center gap-8">
            <ul ref={ref as React.RefObject<HTMLUListElement>} className="w-full flex flex-row justify-center align-center gap-1">
                {items.map((item, index) => {
                    return (
                        <li key={item.id}>
                            <Pill selected={index === selectedIndex}>
                                {item.title}
                            </Pill>
                        </li>
                    )    
                })}
            </ul>
            <Todos boardId="asds"  />
        </div>
    )
}

const Pill = ({ children, selected = false }:{ children: React.ReactNode; selected?: boolean }) => {
    return (
        <button
            className={clsx(
                "m-1 px-4 py-2 text-center rounded-full text-neutral-500",
                selected && "bg-rose-50 text-neutral-800"
            )}
            tabIndex={-1}
        >
            {children}
        </button>
    )
}

export default AllBoard