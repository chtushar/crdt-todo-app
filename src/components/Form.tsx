import React from "react";

const Form = ({ 
        onSubmit, 
        textbarRef
    }:{ 
        onSubmit: (title: string) => void;
        textbarRef?: React.RefObject<HTMLInputElement> | null;
    }) => {
    const [title, setTitle] = React.useState<string>('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit(title);
        setTitle('');
    }

    return (
        <form className="w-full flex gap-4" onSubmit={handleSubmit}>
            <input
                ref={textbarRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title" 
                className="flex-1 p-2 rounded-md border border-neutral-100 outline-none focus:border-blue-400" 
                type="text" 
            />
            <button type="submit" className="bg-rose-100 py-2 px-4 rounded-md text-neutral-800">Add</button>
        </form>
    )
}

export default Form