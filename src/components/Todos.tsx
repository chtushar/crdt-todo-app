import Form from "./Form"
import useBroadcast from "@/hooks/useBroadcast"
import { nanoid } from "nanoid"

const Todos = ({ boardId }: { boardId: string }) => {
    const channel = useBroadcast({
        channelId: boardId,
        filter: { event: 'ADD' },
        callback: (payload) => { console.log('received', payload) }
    })
    
    const handleAddTodo = (title: string) => {
        if (title === '') return
        const payload = {
            id: nanoid(10),
            title,
            order: 0,
            boardId,
        }
        channel?.send({
            type: 'broadcast',
            event: 'ADD',
            payload
        })
    }

    return (
        <>
            <Form onSubmit={handleAddTodo} />
        </>
    )
}

export default Todos