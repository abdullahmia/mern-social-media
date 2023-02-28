import { createSlice } from '@reduxjs/toolkit';

// inital state
const initialState = {
    theme: 'light',
}

const root = window.document.documentElement;

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDarkTheme: (state) => {
            state.theme = 'dark';
            localStorage.setItem('theme', 'dark');
            root.classList.remove('light');
            root.classList.add('dark');
        },
        setLightTheme: (state) => {
            state.theme = 'light';
            localStorage.setItem('theme', 'light');
            root.classList.remove('dark');
            root.classList.add('light');
        }
        
    }
})

export const { setDarkTheme, setLightTheme } = themeSlice.actions;
export default themeSlice.reducer;