import { RiAddLine, RiEditLine, RiDeleteBinLine, RiBrushLine, RiEyeLine, RiFileDownloadLine } from 'react-icons/ri';
import { State } from '../types/State';
import { Button } from "@/components/ui/button";

const ButtonBar = (
  { updateActiveMode }: { updateActiveMode: React.Dispatch<React.SetStateAction<State>> }
) => {
  const buttonData = [
    {
      label: "Dodaj punkt (Q)",
      action: () => updateActiveMode({
        label: "Dodaj punkt",
        dispatchTime: Date.now()
      }),
      icon: <RiAddLine />
    },
    {
      label: "Edytuj punkt (W)",
      action: () => updateActiveMode({
        label: "Edytuj punkt",
        dispatchTime: Date.now()
      }),
      className: "yellow",
      icon: <RiEditLine />
    },
    {
      label: "Usuń punkt (E)",
      action: () => updateActiveMode({
        label: "Usuń punkt",
        dispatchTime: Date.now()
      }),
      className: "red",
      icon: <RiDeleteBinLine />
    },
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
      <Button>text</Button>
      {buttonData.map((button, index) => {
        return (
          <button key={index} className={`button ${button.className}`} onClick={button.action}>
            {button.icon} {button.label}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonBar;