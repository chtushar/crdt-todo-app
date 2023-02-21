import { useDoc } from "./DocProvider";
import useForceUpdate from "@/hooks/useForceUpdate";
import { useYDocProviders } from "@/hooks/useYDocProviders";
import React from "react";

const useDocArray = <T = any>(docId: string) => {
    const { yDoc } = useDoc();
    const forceUpdate = useForceUpdate();
    useYDocProviders<T>(docId, yDoc);

    const array = React.useMemo(() => {
        return yDoc.getArray<T>(docId);
    },[yDoc, docId]);

    React.useEffect(() => {
        array.observe(forceUpdate);
        return () => {
            array.unobserve(forceUpdate);
        }
    },[array, forceUpdate]);

    return { array, yDoc };
};

export default useDocArray;