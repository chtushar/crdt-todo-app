import React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Listbox } from '@headlessui/react';

const SelectItem = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof SelectPrimitive.Item>>((props, forwardedRef) => {
    return (
        <SelectPrimitive.Item
            {...props}
            ref={forwardedRef}
            className="p-2 hover:bg-neutral-100"
        />
    )
})

SelectItem.displayName = "SelectItem"

const Select = ({
    name,
    values = [],
    value,
    onValueChange,
    placeholder,
    reset
}: {
    name?: string;
    value?: string;
    values?: Array<{ label: string, value: string }>;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    reset?: () => void;
}) => {
    return (
        <div>
            <Listbox
                name={name}
                value={value}
                onChange={onValueChange}
            >
                <div className="relative mt-1">
                    <Listbox.Button 
                        className="relative cursor-default rounded-lg bg-white text-left focus:outline-none w-[80px] px-2 py-1 border border-solid border-neutral-200 text-sm text-neutral-600"
                    >
                        {value ? values.find(({ value: v }) => v === value)?.label : placeholder}
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {values.map(({ label, value }) => (
                            <Listbox.Option 
                                key={value} 
                                value={value}
                                className="relative cursor-default select-none p-2 text-gray-900"
                            >
                                {label}
                            </Listbox.Option>
                        ))}

                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    )
}

export default Select