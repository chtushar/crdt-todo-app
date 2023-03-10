import React from "react";
import { TodoStatus } from "@/types";
import Select from "../Select";

const Status = ({ value, onChange }:{ value?: TodoStatus; onChange?: (arg: any) => void }) => {
    const statuses = [
        { label: "Todo", value: TodoStatus.Todo },
        { label: "Pending", value: TodoStatus.Pending },
        { label: "Completed", value: TodoStatus.Completed },
    ]
    const [status, setStatus] = React.useState<string | undefined>(TodoStatus.Todo);

    const handleValueChange = (value: string) => {
        if (onChange) {
            onChange({ status: value });
            return;
        }
        setStatus(value);
    }

    return (
        <Select
            name="status"
            values={statuses}
            value={value ?? status}
            onValueChange={handleValueChange}
            placeholder="Status..."
            defaultValue={TodoStatus.Todo}
        />
    );
}

export default Status;