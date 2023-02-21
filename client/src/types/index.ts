export enum TodoStatus {
    Todo = 'todo',
    Done = 'done'
} 

export enum TodoPriority {
    Low = 'low',
    Medium = 'medium',
    High = 'high'
}

export interface Todo {
    uid: string;
    index?: number;
    title: string;
    status: TodoStatus | null;
    priority: TodoPriority | null;
    assigned_user: string | null;
    date: number | null;
    boardId: string;
}
