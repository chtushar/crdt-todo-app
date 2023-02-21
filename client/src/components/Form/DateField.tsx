import React from 'react';

const DateField = ({
    value,
    onChange
}: {
    value?: number;
    onChange?: (arg: any) => void;
}) => {
    const [date, setDate] = React.useState<number | undefined>(undefined);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = new Date(e.currentTarget.value).getTime();
        if (onChange) {
            onChange({ date: time });
            return;
        }
        setDate(time);
    }

    const formatDate = (date: number) => {
        const d = new Date(value ?? date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <input 
            type="date" 
            name="date" 
            className="relative cursor-default rounded-lg bg-white text-left focus:outline-none px-2 py-1 border border-solid h-[30px] border-neutral-200 text-sm text-neutral-600"
            value={(value ?? date) ? formatDate(value ?? date ?? 1) : undefined}
            onChange={handleValueChange}
         />
    )
}

export default DateField