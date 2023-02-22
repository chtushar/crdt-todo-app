import React from "react";
import Select from "../Select";
import { TodoPriority } from "@/types";

const Priority = ({ onChange, value }:{ onChange?: any; value?: TodoPriority }) => {
    const values = [
        { label: "Low", value: TodoPriority.Low, styles: "text-blue-600" },
        { label: "Medium", value: TodoPriority.Medium, styles: "text-yellow-600" },
        { label: "High", value: TodoPriority.High, styles: "text-red-600" }
    ];
    const [currentValue, setCurrentValue] = React.useState<string | undefined>('');
    const handleValueChange = (value: string) => {
        if (onChange) {
            onChange({ priority: value });
            return;
        }
        setCurrentValue(value);
    }
    const reset = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onChange) {
            onChange({ priority: '' });
            return;
        }
        setCurrentValue('');
    }
    return (
        <Select
            name="priority"
            value={value ?? currentValue}
            values={values} 
            onValueChange={handleValueChange}
            placeholder="Priority..."
            reset={reset}
        />
        
    )
}

export default Priority