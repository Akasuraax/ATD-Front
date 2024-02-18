import { ToastF } from "./Toasts"
import {createContext, PropsWithChildren, useCallback, useContext, useState} from "react";

const defaultValue = {
    toasts: [],
    setToasts: () => {}
}

const ToastContext = createContext(defaultValue)

export function ToastContextProvider ({children}: PropsWithChildren) {
    const [toasts,setToasts] = useState([])
    return <ToastContext.Provider value={{toasts, setToasts}}>
        <Toasts/>
        {children}
    </ToastContext.Provider>
}

export function useToast () {
    const {setToasts} = useContext(ToastContext)
    return {
        pushToast: useCallback((toast) => {
            setToasts(v => [...v,toast])
        },[setToasts])}
}

function Toasts() {
    const { toasts } = useContext(ToastContext);

    return (
        <div className="flex flex-col items-end fixed top-4 left-8 space-y-4 pr-4 ml-4 z-50">
            {toasts.map((toast, index) => (
                <ToastF {...toast} key={index} />
            ))}
        </div>
    );
}