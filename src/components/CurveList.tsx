import React, { ReactNode, useState } from 'react';

interface CurveListProps {
    curves: string[];
    dispatchStateUpdate: React.Dispatch<React.SetStateAction<string[]>>;
    currentCurve: string;
    setCurrentCurve: React.Dispatch<React.SetStateAction<string>>;
}

const CurveList = ({ curves, dispatchStateUpdate, currentCurve, setCurrentCurve }: CurveListProps): ReactNode => {
    const [newCurve, setNewCurve] = useState<string>('');
    const [isListVisible, setListVisibility] = useState<boolean>(false);

    const handleAddCurve = () => {
        if (newCurve.trim() !== '') {
            dispatchStateUpdate([...curves, newCurve]);
            setNewCurve('');
        }
    };

    const toggleListVisibility = () => {
        setListVisibility(!isListVisible);
    };

    const handleChangeCurve = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const target = event.target as HTMLAnchorElement;

        if (target) {
            setCurrentCurve(target.innerText);
        }
    };

    if (isListVisible) {
        return (
            <div className="curve-list-container">
                <div className={`list-container ${isListVisible ? 'visible' : 'hidden'}`}>
                    <h3>Lista warstw</h3>
                    <ul className="curve-list">
                        {curves.map((curve, index) => (
                            <li key={index} className={curve === currentCurve ? "active-curve" : ""}>
                                <a onClick={handleChangeCurve}>{curve}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="add-curve-container">
                        <input
                            type="text"
                            placeholder="Nowa warstwa"
                            value={newCurve}
                            onChange={(e) => setNewCurve(e.target.value)}
                        />
                        <button onClick={handleAddCurve}>Dodaj warstwę</button>
                    </div>
                </div>
                <button className="button" onClick={toggleListVisibility}>
                    {isListVisible ? 'Ukryj listę wartsw' : 'Pokaż listę warstw'}
                </button>
                <p>Aktywna warstwa jest zaznaczona na złoto</p>
            </div>
        );
    } else {
        return (
            <button className="button" onClick={toggleListVisibility}>
                {isListVisible ? 'Ukryj listę warstw' : 'Pokaż listę warstw'}
            </button>
        );
    }
};

export default CurveList;