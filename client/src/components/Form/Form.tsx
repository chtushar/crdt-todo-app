import React from "react";
import clsx from "clsx";
import { Todo, TodoPriority } from "@/types";
import AssignUser from "./AssignUser";
import Priority from "./Priority";
import DateField from "./DateField";

const FORM_CARD_STYLES = {
    default: "shadow-inner h-fit rounded-xl p-4 border border-neutral-100 border-solid flex flex-col gap-3",
    transition: "transition-all duration-300 ease-in-out",
    focus: "focus-within:border-blue-300"
}
const PRIMARY_BUTTON_STYLES = {
    default: "px-3 py-1 text-sm bg-indigo-600 rounded-md text-white min-w-[100px]"
}

const Form = ({ 
        username,
        userId,
        handleAddTodo
    }:{ 
        username: string,
        userId: string,
        handleAddTodo: ({}: Pick<Todo, 'title' | 'assigned_user' | 'priority' | 'date'>) => void
    }) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const date = new Date(data.get("date") as string).getTime();
        console.log(date);
        handleAddTodo({
            title: data.get("title") as string,
            assigned_user: data.get("assignee") as string,
            priority: data.get("priority") as TodoPriority,
            date: isNaN(date) ? null : date
        });
        e.currentTarget.reset();
    }
    return (
        <div className={clsx(
            FORM_CARD_STYLES.default,
            FORM_CARD_STYLES.transition,
            FORM_CARD_STYLES.focus
        )}>
            <form onSubmit={handleSubmit}>
                <input name="title" className="p-2 w-full outline-none" type="text" placeholder="Title" />
                <div className="p-2 flex flex-col md:flex-row md:justify-between gap-4">
                    <div className="flex gap-2 items-baseline">
                        <AssignUser currentUser={{ label: username, value: userId || '' }} />
                        <Priority />
                        <DateField />
                    </div>
                    <button type="submit" className={clsx(PRIMARY_BUTTON_STYLES.default)}>
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
};

export default Form;