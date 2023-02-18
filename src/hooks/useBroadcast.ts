import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { RealtimeChannel } from '@supabase/supabase-js';
import React from 'react';

const useBroadcast = ({
    channelId,
    filter = { event: 'sync' },
    callback = () => {},
}:{
    channelId: string;
    filter?: { event: string };
    callback?: (payload: any) => void
}) => {
    const hasSubscried = React.useRef(false);
    const channel = React.useRef<RealtimeChannel | null>(null);
    const client = useSupabaseClient();

    React.useEffect(() => {
        channel.current = client?.channel(channelId)
        channel.current.on(
            'broadcast', 
            filter, 
            callback
        ).subscribe(() => {
            console.log('subscribed');
            hasSubscried.current = true;
        })

        return () => {
            channel.current?.unsubscribe();
        }
    }, [channelId]);

    return channel.current;
};

export default useBroadcast;