import { atom } from "jotai";

export const keyboardAtom = atom({
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    metaKey: false,
    key: "",
});