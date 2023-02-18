import React from "react";
import { useAtom } from "jotai";
import { keyboardAtom } from "@/atoms/keyboard";

export const useKeyboardNavigation = ({
    nextKey = "ArrowDown",
    prevKey = "ArrowUp",
    enabled = false,
    defaultSelectedIndex = 0,
    onEnter = undefined
}: {
    nextKey?: KeyboardEvent["key"];
    prevKey?: KeyboardEvent["key"];
    enabled: boolean;
    defaultSelectedIndex?: number;
    onEnter?: (index: number) => void;
}) => {
    const root = React.useRef<HTMLElement>(null);
    const [keyboard] = useAtom(keyboardAtom);
    const [selectedIndex, setSelectedIndex] = React.useState(defaultSelectedIndex);

    
    const handleSelect = (index: number) => {
        setSelectedIndex(index);
    }
    
    const handleEnter = () => {
        if (selectedIndex !== -1) {            
            onEnter?.(selectedIndex);
        }
    }
    
    const reset = () => {
        setSelectedIndex(defaultSelectedIndex);
    }
    
    React.useEffect(() => {
        if (enabled && root.current) {
            switch (keyboard.key) {
                case nextKey:
                    setSelectedIndex(Math.min(selectedIndex + 1, root.current.childElementCount - 1));
                    break;
                case prevKey:
                    setSelectedIndex(Math.max(selectedIndex - 1, 0));
                    break;
                case "Enter":
                    handleEnter();
                default:
                    break;
            }
        }
    }, [keyboard, enabled, nextKey, prevKey]);

    return {
        ref: root,
        selectedIndex,
        handleSelect,
        reset
    }
}
