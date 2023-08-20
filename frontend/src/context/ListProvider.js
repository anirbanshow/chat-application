import { useState, createContext, useContext } from "react";

const ListContext = createContext();

const ListProvider = ({ children }) => {

    const [chats, setChats] = useState([]);

    return (
        <ListContext.Provider value={[chats, setChats]}>
            {children}
        </ListContext.Provider>
    )
}

export const ListState = () => {
    return useContext(ListContext);
}

export default ListProvider;