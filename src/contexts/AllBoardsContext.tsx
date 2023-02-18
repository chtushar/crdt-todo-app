import React from "react"
import { nanoid } from "nanoid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export interface Board {
    id: string;
    title: string;
}

type AllBoardsContextType = any;

const AllBoardsContext = React.createContext<AllBoardsContextType>({} as AllBoardsContextType);

const AllBoardsProvider = ({ children, userId }: any) => {
    const hasSubscribed = React.useRef(false);
    const supabaseClient = useSupabaseClient();
    const channel = React.useMemo(() => {
        const channel = supabaseClient?.channel(userId);
        if (!hasSubscribed.current) {
            console.log('subscribing');
            channel?.on(
            'broadcast', 
            { event: 'ADD' },
            (payload) => { console.log('received', payload) })
            .subscribe(() => {
                hasSubscribed.current = true;
            });
        }
        
        return channel;
    }, [supabaseClient, userId]);

    React.useEffect(() => {
        console.log(supabaseClient.getChannels());
    }, []);

    const handleAddBoard = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // @todo Fix type error
        //@ts-ignore
        const title = e.currentTarget[0].value;
        const payload = {
            id: nanoid(10),
            title
        }
        channel?.send({
            type: 'broadcast',
            event: 'ADD',
            payload
        });
    }


    return (
        <AllBoardsContext.Provider 
            value={{ 
                handleAddBoard
            }}
        >
            {children}
        </AllBoardsContext.Provider>
    );
};

export const useAllBoards = () => {
    const context = React.useContext(AllBoardsContext);
    if (context === undefined) {
        throw new Error("useBoard must be used within a BoardProvider");
    }
    return context;
};

export default AllBoardsProvider;
