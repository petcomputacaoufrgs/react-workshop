import { useEffect } from 'react'

export const useEvent = (event: any, handler: {(this: Window, ev: any): any; (this: Window, ev: any): any;}, passive = false) => {
    useEffect(() => {
        window.addEventListener(event, handler, passive)
        return function cleanup() {
            window.removeEventListener(event, handler)
        }
    })
}

export const isNotEmpty = <T>(list?: T[]) => list !== undefined && list.length > 0

export const randomItem = <T>(list: T[]): T => {
    return list[Math.floor(Math.random() * list.length)]
}