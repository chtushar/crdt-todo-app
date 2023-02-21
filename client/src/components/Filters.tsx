import { TodoPriority, TodoStatus } from "@/types";
import React from "react";
import AssignUser from "./Form/AssignUser";
import Priority from "./Form/Priority";
import Status from "./Form/Status";

export interface FiltersProps { 
    currentUser: { label: string; value: string };
    filters: {
        priority?: TodoPriority;
        status?: TodoStatus;
        assigned_user?: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        priority?: TodoPriority;
        status?: TodoStatus;
        assigned_user?: string;
    }>>
}

const Filters = ({ currentUser, filters, setFilters }: FiltersProps) => {
    const formRef = React.useRef<HTMLFormElement>(null);
    
    const handleChange = (data: Record<string, string>) => {
        setFilters(prev => {
            return {
                ...prev,
                ...data
            }
        })
    }
    
    return (
        <form ref={formRef} className="w-full flex justify-end gap-2">
            <AssignUser currentUser={currentUser} value={filters.assigned_user} onChange={handleChange} />
            <Priority value={filters.priority} onChange={handleChange} />
            <Status value={filters.status} onChange={handleChange} />
        </form>
    );
}

export default Filters;