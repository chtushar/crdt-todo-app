import React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Listbox } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";
import { TodoPriority, TodoStatus } from "@/types";
import Priority from "./Form/Priority";

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

const SELECT_BUTTON_STYLES = {
    default: "relative z-0 flex justify-between items-center cursor-pointer rounded-lg bg-white text-left focus:outline-none w-[96px] px-2 py-1 border border-solid border-neutral-200 text-sm text-neutral-600",
    focus: "focus:border-blue-300"
}

const Select = ({
    name,
    values = [],
    value,
    onValueChange,
    placeholder,
    reset,
    onOpenChange,
    defaultValue,
}: {
    name?: string;
    value?: string;
    values?: Array<{ label: string, value: string, styles?: string }>;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    onOpenChange?: () => void;
    placeholder?: string;
    reset?: (e: React.MouseEvent) => void;
}) => {
    const selectedValue = values.find(({ value: v }) => v === value);
    return (
        <div>
            <Listbox
                name={name}
                value={value}
                onChange={onValueChange}
            >
                <div className="relative mt-1">
                    <Listbox.Button
                        onClick={onOpenChange}
                        className={clsx(
                            SELECT_BUTTON_STYLES.default,
                            SELECT_BUTTON_STYLES.focus,
                            value === TodoStatus.Todo && "text-blue",
                            value === TodoStatus.Pending && "text-yellow",
                            value === TodoStatus.Completed && "text-green",
                            value === TodoPriority.Low && "text-blue",
                            value === TodoPriority.Medium && "text-yellow",
                            value === TodoPriority.High && "text-red",
                        )}
                    >
                        {value ?
                            <>
                                <span>
                                    {selectedValue?.label}
                                </span>
                                {reset && defaultValue !== value && (
                                    <span onClick={reset}>
                                        <XCircleIcon className="w-4 h-4 stroke-red-600" />
                                    </span>
                                )}
                            </> 
                        : placeholder}
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {values.map(({ label, value, styles }) => (
                            <Listbox.Option 
                                key={value} 
                                value={value}
                                as={React.Fragment}
                            >
                                {({ active }) => (
                                    <li className={clsx(
                                        "relative cursor-default select-none p-1 text-gray-900 rounded m-1",
                                        active && "bg-indigo-400 text-white",
                                    )}>
                                        {label}
                                    </li>
                                )}
                            </Listbox.Option>
                        ))}

                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    )
}

export default Select