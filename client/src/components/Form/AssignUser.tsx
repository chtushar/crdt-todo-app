import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Select from "../Select";

interface Value {
    label: string;
    value: string;
}

const AssignUser = ({ currentUser, value, onChange }:{ currentUser: Value; value?: string; onChange?: (arg: any) => void }) => {
    const [values, setValues] = React.useState<Array<Value>>([currentUser]);
    const supabase = useSupabaseClient();
    const [currentValue, setCurrentValue] = React.useState<string | undefined>('');
    
    const fetchUsers = async (open: boolean) => {
        try {
            if (open) {
                const  { data } = await supabase.from("user_settings").select("*");
                const val = data?.map(({ id, username }) => ({
                    label: username,
                    value: id
                })).filter(({ value }) => value !== currentUser.value);

                if (val) {
                    setValues([currentUser, ...val]);
                }
            }
        } catch (error) {
            
        }
    }

    const handleValueChange = (value: string) => {
        if (onChange) {
            onChange({ assigned_user: value });
            return;
        }
        setCurrentValue(value);
    }
    
    return (
        <Select
            name="assignee"
            onOpenChange={fetchUsers} 
            value={value ?? currentValue}
            values={values} 
            onValueChange={handleValueChange}
            placeholder="Assign..."
        />
        
    )
}

export default AssignUser;