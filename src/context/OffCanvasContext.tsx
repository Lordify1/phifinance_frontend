import { createContext, useState } from "react";

export const OffCanvasContext = createContext({
    showOffCanvas: false,
    setShowOffCanvas: null,
    offData: null,
    setOffData: null
})

export const OffCanvasProvider = ({children}) => {
    const [showOffCanvas, setShowOffCanvas] = useState(false)
    const [offData, setOffData] = useState(null);

    return(
        <OffCanvasContext.Provider
        value={{showOffCanvas, setShowOffCanvas, offData, setOffData}}
        >
            {children}
        </OffCanvasContext.Provider>
    )
}