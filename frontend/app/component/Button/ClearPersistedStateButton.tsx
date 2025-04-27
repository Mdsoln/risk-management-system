// ClearPersistedStateButton.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { persistor } from '../../../store/store'; // Adjust the path to your store file

const ClearPersistedStateButton: React.FC = () => {
    const handleClearState = () => {
        persistor.purge();
        // Optionally, dispatch an action to reset the Redux state if needed
    };

    return (
        <button onClick={handleClearState}>Clear Persisted State</button>
    );
};

export default ClearPersistedStateButton;