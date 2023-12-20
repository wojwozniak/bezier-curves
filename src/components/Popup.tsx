import { useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';

const Popup = ({ screen }: { screen: string }) => {
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        setOpenPopup(true);

        const timer = setTimeout(() => {
            setOpenPopup(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [screen]);

    return (
        <Snackbar
            open={openPopup}
            message={screen}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            autoHideDuration={3000} />
    )
};

export default Popup;