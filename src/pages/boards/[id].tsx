import AllTodos from '@/components/AllTodos'
import BoardProvider from '@/contexts/BoardContext'
import TodosYDocProvider from '@/contexts/TodosYDocContext'
import { useRouter } from 'next/router'

const Board = () => {
    const router = useRouter()
    const { id } = router.query
    
    return (
        <div>
            <TodosYDocProvider>
                <BoardProvider boardId={id}>
                    <AllTodos />
                </BoardProvider>
            </TodosYDocProvider>
        </div>
    )
}

export default Board