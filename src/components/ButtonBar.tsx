import React, { useState } from 'react';
import { RiBrushLine, RiFileDownloadLine } from 'react-icons/ri';
import { State } from '../types/State';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const ButtonBar = ({ updateActiveMode }: { updateActiveMode: React.Dispatch<React.SetStateAction<State>> }) => {
  const [exportMenuAnchorEl, setExportMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [previewChecked, setPreviewChecked] = useState(false);
  const [netChecked, setNetChecked] = useState(false);

  const handlePreviewChange = () => {
    setPreviewChecked(!previewChecked);
    updateActiveMode({
      label: previewChecked ? "Podgląd wyłączony" : "Podgląd włączony",
      dispatchTime: Date.now()
    });
  };

  const handleNetChange = () => {
    setNetChecked(!netChecked);
    updateActiveMode({
      label: netChecked ? "Siatka podglądu wyłączona" : "Siatka podglądu włączona",
      dispatchTime: Date.now()
    });
  }

  const handleExportMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExportMenuAnchorEl(event.currentTarget);
  };

  const handleExportMenuClose = () => {
    setExportMenuAnchorEl(null);
  };

  return (
    <div className="button-row flex space-x-2">
      <FormControlLabel
        control={<Switch checked={previewChecked} onChange={handlePreviewChange} />}
        label={"Podgląd"}
        style={{ flexDirection: "row-reverse", marginRight: "0" }}
      />
      <FormControlLabel
        control={<Switch checked={netChecked} onChange={handleNetChange} />}
        label={"Siatka podglądu"}
        style={{ flexDirection: "row-reverse", marginRight: "0" }}
      />
      <Button variant="contained"
        className='flex !bg-red-500 background-red gap-1'
        onClick={() => updateActiveMode({ label: "Wyczyść", dispatchTime: Date.now() })}>
        <RiBrushLine /> Wyczyść warstwę
      </Button>

      <Button variant="contained" className='flex !bg-green-500 gap-1' onClick={handleExportMenuClick}>
        <RiFileDownloadLine /> Eksportuj
      </Button>
      <Menu
        anchorEl={exportMenuAnchorEl}
        open={Boolean(exportMenuAnchorEl)}
        onClose={handleExportMenuClose}
      >
        <MenuItem onClick={() => updateActiveMode({ label: "Eksportuj PNG", dispatchTime: Date.now() })}>
          Eksportuj PNG
        </MenuItem>
        <MenuItem onClick={() => updateActiveMode({ label: "Eksportuj SVG", dispatchTime: Date.now() })}>
          Eksportuj SVG
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ButtonBar;