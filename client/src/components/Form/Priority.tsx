import React from "react";
import Select from "../Select";
import { TodoPriority } from "@/types";

const Priority = ({ onChange, value }:{ onChange?: any; value?: TodoPriority }) => {
    const values = [
        { label: "Low", value: TodoPriority.Low },
        { label: "Medium", value: TodoPriority.Medium },
        { label: "High", value: TodoPriority.High }
    ];
    const [currentValue, setCurrentValue] = React.useState<string | undefined>('');
    const handleValueChange = (value: string) => {
        if (onChange) {
            onChange({ priority: value });
            return;
        }
        setCurrentValue(value);
    }
    return (
        <Select
            name="priority"
            value={value ?? currentValue}
            values={values} 
            onValueChange={handleValueChange}
            placeholder="Priority..."
        />
        
    )
}

export default Priority