import React, { useContext, createContext, FC, useState, useCallback, useMemo } from 'react';

/**
 *
 * Build a simple app that allows the user to toggle light and dark mode as a react hook.
 *
 * Components will need a useMode() hook either 'light' or 'dark' so that they can change
 * their internal CSS.
 *
 * There should also be a way to useModeToggler() which returns a function that can be used
 * to toggle light or dark mode.
 *
 * The idea is that you have a way to globally mark the theme for the entire
 * app, then a hook that can be used to change the theme.
 *
 */

export type Theme = 'light' | 'dark';

export type UseThemeToggler = (theme: Theme) => void;

export type UseTheme = () => Theme;

// My solution for this is creating global context and wraping Main component into provider so theme mode could be accessed from any component of application

export type SettingsContextValue = {
    mode: Theme,
    toggleMode: UseThemeToggler
}

const DEFAULT_MODE = 'dark';

const SettingsContext = createContext<SettingsContextValue>({
    mode: DEFAULT_MODE,
    toggleMode: () => {}
});

const SettingsProvider: FC = ({ children }) => {
    const [mode, setMode] = useState<Theme>(DEFAULT_MODE);

    const toggleMode = useCallback((mode: Theme) => {
        setMode(mode);
    }, [])

    const value = useMemo(() => ({
        mode,
        toggleMode
    }), [mode])

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

const useMode = () => useContext(SettingsContext).mode;
const useThemeToggler = () => useContext(SettingsContext).toggleMode;

export const App = () => {
    return (
        <SettingsProvider>
            <Main/>
        </SettingsProvider>
    );
}

export const Main = () => {
    return (
        <div>
            <Settings/>
        </div>
    );

}

export const Settings = () => {
    const mode = useMode();
    const toggleTheme = useThemeToggler();

    const toggleMode = React.useCallback(() => {
        toggleTheme(mode === 'light' ? 'dark' : 'light')
    }, [mode]);

    return (
        <button onClick={toggleMode}>toggle light/dark mode</button>
    );

}