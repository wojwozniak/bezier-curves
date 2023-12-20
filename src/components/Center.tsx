import { useEffect, useState } from 'react'
import Editor from './Editor'
import CurveList from './CurveList';
import { State } from '../types/State';

const defaultMode: State = { label: "Dodaj punkt", dispatchTime: Date.now() };
const defaultCurves: string[] = ["Warstwa 1", "Warstwa 2", "Warstwa 3", "Warstwa 4", "Warstwa 5", "Warstwa 6", "Warstwa 7", "Warstwa 8", "Warstwa 9"];
const defaultCurve: string = "Warstwa 1";
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
            <div className="flex items-center justify-center flex-col">
                <Editor activeMode={activeMode}
                    currentCurve={currentCurve}
                    updateActiveMode={updateActiveMode}
                    setCurveFromKeyboard={setCurveFromKeyboard} />
                <CurveList curves={curves}
                    dispatchStateUpdate={dispatchStateUpdate}
                    currentCurve={currentCurve}
                    setCurrentCurve={setCurrentCurve} />
            </div>
        </>
    )
}

export default Center