import React, { useState } from 'react';
export const DarkModeContext = React.createContext();
DarkModeContext.displayName = 'DarkMode';

export const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setDarkMode] = useState(false);

    function darkMode() {
        setDarkMode(!isDarkMode)
    }

    return (
        <DarkModeContext.Provider
            value={{
                isDarkMode,
                darkMode
            }}
        >
            {children}
        </DarkModeContext.Provider>
    )
}