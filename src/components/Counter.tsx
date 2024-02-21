import React, {ChangeEvent} from 'react';
import s from './Counter.module.css'
import {Button} from './Button';
import {useDispatch, useSelector} from "react-redux";
import {
    changeMaxValueAC,
    changeStartValueAC,
    InitialStateType,
    numberChangeAC,
    numberResetAC,
    setStartValueAC
} from "../redux/reducer";
import {RootStateType} from "../redux/store";

export const Counter = () => {

    const dispatch = useDispatch()
    const state = useSelector<RootStateType, InitialStateType>(state => state.counter)

    const numberChange = () => {
        dispatch(numberChangeAC())
    }

    const numberReset = () => {
        dispatch(numberResetAC())
    }

    const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value)>-2 && Number(e.currentTarget.value)<25) {
            dispatch(changeMaxValueAC(Number(e.currentTarget.value)))
        }
    }

    const changeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value)>-2 && Number(e.currentTarget.value)<25) {
            dispatch(changeStartValueAC(Number(e.currentTarget.value)))
        }
    }

/*    useEffect(()=> {
        localStorage.setItem('setMaxValue', JSON.stringify(maxValue))
    }, [maxValue])

    useEffect(()=> {
        localStorage.setItem('setStartValue', JSON.stringify(startValue))
    }, [startValue])

    useEffect(()=> {
        let maxValueLocal = localStorage.getItem('setMaxValue')
        if (maxValueLocal) {
            let newMaxValue = JSON.parse(maxValueLocal)
            setStartValue(newMaxValue)
        }
    }, [])

    useEffect(()=> {
        let startValueLocal = localStorage.getItem('setStartValue')
        if (startValueLocal) {
            let newStartValue = JSON.parse(startValueLocal)
            setStartValue(newStartValue)
        }
    }, [])*/

    const setButton = () => {
        if (state.maxValue > state.startValue && state.startValue >= 0) {
            dispatch(setStartValueAC())
        }
    }

    const error = state.startValue<0 || state.maxValue<0 || state.startValue >= state.maxValue

    return (
        <div className={s.wrapper}>
            <div className={s.counter}>
                <div className={s.settings}>
                    <div>Max value:<input onChange={changeMaxValue} value={state.maxValue} type={'number'}/></div>
                    <div>Start value:<input onChange={changeStartValue} value={state.startValue} type={'number'}/></div>
                </div>
                <div className={s.buttons}>
                    <Button name={'set'} callBack={setButton}
                            disabled={state.maxValue <= state.startValue || state.startValue < 0 || state.maxValue < 0 || !state.valueChanges}/>
                </div>
            </div>
            <div className={s.counter}>
                { error ? <div className={s.error}>Error</div>
                    : state.valueChanges ? <div className={s.setvalue}>Set value</div>
                        : <div className={state.currentValue === state.maxValue ? (`${s.tabloChange} + ${s.tablo}`) : s.tablo}>{state.currentValue}</div>}
                <div className={s.buttons}>
                    <Button name={'inc'} callBack={numberChange} disabled={state.disableButton}/>
                    <Button name={'reset'} callBack={numberReset} disabled={state.currentValue === state.startValue || error || state.valueChanges}/>
                </div>
            </div>
        </div>
    );
};
