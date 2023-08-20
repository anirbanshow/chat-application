import { useState, createContext, useEffect, useContext } from "react";

const SelectedChatContext = createContext();

const SelectedChatProvider = ({ children }) => {

    const [selectedChat, setSelectedChat] = useState("");

    return (
        <SelectedChatContext.Provider value={[selectedChat, setSelectedChat]}>
            {children}
        </SelectedChatContext.Provider>
    )
}

export const SelectedChatState = () => {
    return useContext(SelectedChatContext)
}

export default SelectedChatProvider;