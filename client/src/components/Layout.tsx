import React from 'react'
import { useAtom } from 'jotai'
import { keyboardAtom } from '@/atoms/keyboard';

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const [,setKey] = useAtom(keyboardAtom);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey) {
                e.preventDefault()
            }
            setKey({
                key: e.key,
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey,
                altKey: e.altKey,
                metaKey: e.metaKey,
            })
        }
        document.body.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <div className="flex my-0 mx-auto w-full max-w-[500px] pt-[150px] h-full">
            {children}
        </div>
    )
}

export default Layout