import { createSlice } from '@reduxjs/toolkit';

interface Notification {
    id: string;
    message: string;
}

interface NotificationsState {
    notifications: Notification[];
}

const initialState: NotificationsState = {
    notifications: [
        { id: '1', message: 'You have a new message' },
        { id: '2', message: 'Your order has been shipped' },
    ],
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
});

export default notificationsSlice.reducer;
