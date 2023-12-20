import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Box, Button } from '@mui/material';

interface CurveListProps {
    curves: string[];
    dispatchStateUpdate: React.Dispatch<React.SetStateAction<string[]>>;
    currentCurve: string;
    setCurrentCurve: React.Dispatch<React.SetStateAction<string>>;
}

const CurveList = ({ curves, dispatchStateUpdate, currentCurve, setCurrentCurve }: CurveListProps) => {
    const [newCurve, setNewCurve] = useState('');
    const [isListVisible, setListVisibility] = useState(true);

    const handleAddCurve = () => {
        if (newCurve.trim() !== '') {
            dispatchStateUpdate([...curves, newCurve]);
            setNewCurve('');
        }
    };

    const handleChangeCurve = (curve: string) => {
        setCurrentCurve(curve);
    };

    return (
        <Box sx={{ position: 'absolute', top: 0, right: 0, width: 300 }}>
            <Button 
                variant="contained" 
                onClick={() => setListVisibility(!isListVisible)}
                sx={{ position: 'absolute', top: 8, right: 8 }}>
                {isListVisible ? 'Ukryj warstwy' : 'Pokaż warstwy'}
            </Button>

            {isListVisible && (
                <Box sx={{ pt: 6, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                        <List>
                            {curves.map((curve, index) => (
                                <ListItem
                                    key={index}
                                    button
                                    selected={curve === currentCurve}
                                    onClick={() => handleChangeCurve(curve)}
                                >
                                    <ListItemText primary={curve} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Nowa warstwa"
                        value={newCurve}
                        onChange={(e) => setNewCurve(e.target.value)}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleAddCurve} 
                        sx={{ mt: 1 }}>
                        Dodaj nową warstwę
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default CurveList;