import React from 'react'
import { useAtom } from 'jotai'
import { keyboardAtom } from '@/atoms/keyboard'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const [,setKey] = useAtom(keyboardAtom);

    React.useLayoutEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
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
        <div className="flex my-0 mx-auto w-full max-w-[600px] pt-[150px]">
            {children}
        </div>
    )
}

export default Layout