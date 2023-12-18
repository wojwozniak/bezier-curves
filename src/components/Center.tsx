import { useEffect, useState } from 'react'
import Editor from './Editor'
import ButtonBar from './ButtonBar'
import CurveList from './CurveList';
import { State } from '../types/State';

const defaultMode: State = { label: "Dodaj punkt", dispatchTime: Date.now() };
const defaultCurves: string[] = ["Główna krzywa", "Krzywa 2"];
const defaultCurve: string = "Główna krzywa";
const defaultCurveFromKeyboard: number = 1;

const Center = () => {
    const [activeMode, updateActiveMode] = useState<State>(defaultMode);
    const [curves, dispatchStateUpdate] = useState<string[]>(defaultCurves);
    const [currentCurve, setCurrentCurve] = useState<string>(defaultCurve);
    const [curveFromKeyboard, setCurveFromKeyboard] = useState<number>(defaultCurveFromKeyboard);

    useEffect(() => {
        if (curves.length >= curveFromKeyboard) {
            setCurrentCurve(curves[curveFromKeyboard - 1]);
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