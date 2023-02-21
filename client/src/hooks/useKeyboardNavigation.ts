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

    const reset = () => {
        setSelectedIndex(defaultSelectedIndex);
    }

    const focusSelected = (index: number) => {
        if (root.current) {
            const child = root.current.children[index];
            if (child) {
                (child as HTMLElement).focus();
            }
        }
    }
    
    React.useEffect(() => {
        if (enabled && root.current) {
            switch (keyboard.key) {
                case nextKey:
                    var index = Math.min(selectedIndex + 1, root.current.childElementCount - 1);
                    setSelectedIndex(index);
                    focusSelected(index)
                    break;
                case prevKey:
                    var index = Math.max(selectedIndex - 1, 0);
                    setSelectedIndex(index);
                    focusSelected(index)
                    break;
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
