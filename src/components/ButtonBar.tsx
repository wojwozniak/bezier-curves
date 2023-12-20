import { RiBrushLine, RiEyeLine, RiFileDownloadLine } from 'react-icons/ri';
import { State } from '../types/State';
import Button from '@mui/material/Button';

const ButtonBar = (
  { updateActiveMode }: { updateActiveMode: React.Dispatch<React.SetStateAction<State>> }
) => {
  const buttonData = [
    {
      label: "Wyczyść kanwę",
      action: () => updateActiveMode({
        label: "Wyczyść",
        dispatchTime: Date.now()
      }),
      className: "red row2",
      icon: <RiBrushLine />
    },
    {
      label: "Podgląd krzywej",
      action: () => updateActiveMode({
        label: "Podgląd",
        dispatchTime: Date.now()
      }),
      className: "row2 yellow",
      icon: <RiEyeLine />
    },
    {
      label: "Eksportuj PNG",
      action: () => updateActiveMode({
        label: "Eksportuj PNG",
        dispatchTime: Date.now()
      }),
      className: "green row2",
      icon: <RiFileDownloadLine />
    },
    {
      label: "Eksportuj SVG",
      action: () => updateActiveMode({
        label: "Eksportuj SVG",
        dispatchTime: Date.now()
      }),
      className: "green row2",
      icon: <RiFileDownloadLine />
    }
  ];

  return (
    <div className="button-row">
      {buttonData.map((button, index) => {
        return (
          <Button variant="contained" key={index} onClick={button.action}>
            {button.icon} {button.label}
          </Button>
        );
      })}
    </div>
  );
};

export default ButtonBar;