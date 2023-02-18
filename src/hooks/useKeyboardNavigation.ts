import React from "react";
import { useAtom } from "jotai";
import { keyboardAtom } from "@/atoms/keyboard";

export const useKeyboardNavigation = ({
    nextKey = "ArrowDown",
    prevKey = "ArrowUp",
    enabled = false
}: {
    nextKey?: KeyboardEvent["key"];
    prevKey?: KeyboardEvent["key"];
    enabled: boolean;
}) => {
    const root = React.useRef<HTMLElement>(null);
    const [keyboard] = useAtom(keyboardAtom);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    React.useEffect(() => {
        if (enabled && root.current) {
            switch (keyboard.key) {
                case nextKey:
                    setSelectedIndex(Math.min(selectedIndex + 1, root.current.childElementCount - 1));
                    break;
                case prevKey:
                    setSelectedIndex(Math.max(selectedIndex - 1, 0));
                    break;
                default:
                    break;
            }
        }
    }, [keyboard, enabled, nextKey, prevKey]);

    return {
        ref: root,
        selectedIndex
    }
}