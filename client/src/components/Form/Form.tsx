import React from "react";
import clsx from "clsx";
import { Todo, TodoPriority } from "@/types";
import AssignUser from "./AssignUser";
import Priority from "./Priority";
import DateField from "./DateField";


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
            "form-card"
        )}>
            <form onSubmit={handleSubmit}>
                <input name="title" className="p-2 w-full outline-none" type="text" placeholder="Title" required/>
                <div className="p-2 flex flex-col md:flex-row md:justify-between gap-4">
                    <div className="flex gap-2 items-baseline">
                        <AssignUser currentUser={{ label: username, value: userId || '' }} />
                        <Priority />
                        <DateField />
                    </div>
                    <button type="submit" className={clsx('primary-btn', 'min-w-[100px]')}>
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
};

export default Form;