// themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Theme {
    id: string;
    label: string;
    isDarkMode: boolean;
}


const initialTheme: Theme = {
    id: 'light',
    label: 'Light Mode',
    isDarkMode: false,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialTheme,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            // Directly replace the state with the new theme object
            return action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
