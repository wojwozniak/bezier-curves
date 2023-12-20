import { useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';

const InstructionsModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '90%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    };

    return (
        <div>
            <Button sx={{ position: 'absolute', top: 8, left: 8 }} onClick={handleOpen}>Instrukcja obsługi</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography variant="h4" sx={{ mb: 2 }}>Instrukcja obsługi</Typography>
                    <Typography variant="body1" component="ul" sx={{ mb: 2, flexGrow: 1 }}>
                        <li>Kliknij lewym przyciskiem myszy by dodać nowy punkt</li>
                        <li>Kliknij prawym przyciskiem myszy by usunąć punkt</li>
                        <li>Kliknij na punkt lewym przyciskiem myszy by go przesunąć - pierwsze kliknięcie zaznacza punkt, drugie go puszcza</li>
                        <li>Skorzystaj z przycisków na dole by wyczyścić kanwę lub wyeksportować plik w wybranym formacie</li>
                        <li>Tryb podglądu pokazuje jak będzie wyglądał wyeksportowany plik</li>
                        <li>Aplikacja obsługuje wiele warstw - menu w prawym górnym rogu</li>
                        <li>Przyciski 1,2,3....,9 to skróty klawiszowe do warstw 1-9</li>
                    </Typography>
                    <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>Zamknij</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default InstructionsModal;