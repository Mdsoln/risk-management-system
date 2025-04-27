import React from 'react';
import { Button, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Theme, setTheme } from '../../../store/slices/themeSlice';
import { RootState } from '../../../store/store';
import './ThemeToggle.css'; // Import the CSS file

const ThemeToggle: React.FC = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme);

    const handleThemeChange = (checked: boolean) => {
        const newTheme: Theme = {
            id: checked ? 'dark' : 'light',
            label: checked ? 'Dark Mode' : 'Light Mode',
            isDarkMode: checked,
        };
        dispatch(setTheme(newTheme));
    };

    return (
        <div className="theme-toggle-container">
            <span className="theme-toggle-label">{theme.label}</span>
            <Switch onChange={handleThemeChange} checked={theme.isDarkMode} className="theme-toggle-switch" />
        </div>
    );
};

export default ThemeToggle;
