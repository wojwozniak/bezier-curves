import { useEffect, useState } from 'react'
import Editor from './Editor'
import ButtonBar from './ButtonBar'
import CurveList from './CurveList';

const Center = () => {
    const [activeMode, updateActiveMode] = useState<State>({ label: "Dodaj punkt", dispatchTime: Date.now() } as State);
    const [curves, dispatchStateUpdate] = useState<string[]>(["Główna krzywa", "Krzywa 2"]);
    const [currentCurve, setCurrentCurve] = useState<string>("Główna krzywa");
    const [curveFromKeyboard, setCurveFromKeyboard] = useState<number>(1);

    useEffect(() => {
        if(curves.length >= curveFromKeyboard) {
            setCurrentCurve(curves[curveFromKeyboard-1]);
        }
    }, [curveFromKeyboard]);

    return (
        <>
            <div className="screen">
                <Editor activeMode={activeMode}
                    curves={curves}
                    currentCurve={currentCurve}
                    updateActiveMode={updateActiveMode}
                    setCurveFromKeyboard={setCurveFromKeyboard} />
                <div className='cont'>
                    <CurveList curves={curves}
                        dispatchStateUpdate={dispatchStateUpdate}
                        currentCurve={currentCurve}
                        setCurrentCurve={setCurrentCurve} />
                </div>
            </div>
            <ButtonBar updateActiveMode={updateActiveMode} />
        </>
    )
}

export default Center