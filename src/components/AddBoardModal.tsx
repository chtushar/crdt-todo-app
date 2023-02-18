import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { PlusIcon } from '@heroicons/react/24/outline';
import Form from './Form';

const AddBoardModal = ({ onSubmit }:{ onSubmit: (title: string) => void }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const handleSubmit = (title: string) => {
        onSubmit(title);
        setIsOpen(false);
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
        }}>
            <Dialog.Trigger asChild>
            <button className="inline-block bg-rose-600 rounded-full p-2 m-1 absolute">
                    <PlusIcon className="w-6 h-6 text-neutral-100" />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Form onSubmit={handleSubmit} />
                </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
    )
}

export default AddBoardModal