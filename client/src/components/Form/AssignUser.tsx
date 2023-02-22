import React from "react";
import uniqBy from "lodash/uniqBy";
import useSwr, { preload } from "swr";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Select from "../Select";

interface Value {
    label: string;
    value: string;
}

const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    return data?.map(({ id, username }: any) => ({
        label: username,
        value: id
    }));
}

preload('/api/users/all', fetcher);

const AssignUser = ({ currentUser, value, onChange }:{ currentUser: Value; value?: string; onChange?: (arg: any) => void }) => {
    const [values, setValues] = React.useState<Array<Value>>([currentUser]);
    const supabase = useSupabaseClient();
    const [currentValue, setCurrentValue] = React.useState<string | undefined>('');
    const { data } = useSwr('/api/users/all', fetcher, { refreshInterval: 20 * 1000 });

    const handleValueChange = (value: string) => {
        if (onChange) {
            onChange({ assigned_user: value });
            return;
        }
        setCurrentValue(value);
    }

    const reset = () => {
        if (onChange) {
            onChange({ assigned_user: undefined });
            return;
        }
        setCurrentValue('');
    }
    
    return (
        <Select
            name="assignee"
            value={value ?? currentValue}
            values={uniqBy([...values, ...(data ?? [])], 'value')} 
            onValueChange={handleValueChange}
            placeholder="Assign..."
            reset={reset}
        />
        
    )
}

export default AssignUser;