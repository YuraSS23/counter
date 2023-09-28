import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Counter.module.css'
import {Button} from './Button';

export const Counter = () => {

    const [number, setNumber] = useState<number>(0)
    const [disableButton, setDisableButton] = useState<boolean>(false)

    const [maxValue, setMaxValue] = useState( ()=>{
        return Number(localStorage.getItem('setMaxValue')) || 0
    })
    const [startValue, setStartValue] = useState(()=>{
        return Number(localStorage.getItem('setStartValue')) || 0
    })

    const numberChange = () => {
        setNumber(number + 1);
        (number < maxValue - 1 ? setDisableButton(false) : setDisableButton(true))
    }

    const numberReset = () => {
        setNumber(startValue)
        setDisableButton(false)
    }

    const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value)>-2 && Number(e.currentTarget.value)<25) {
            setMaxValue(Number(e.currentTarget.value))
        }
    }

    const changeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value)>-2 && Number(e.currentTarget.value)<25) {
            setStartValue(Number(e.currentTarget.value))
        }
    }

    useEffect(()=> {
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
    }, [])

    const setButton = () => {
        if (maxValue > startValue && startValue >= 0) {
            setNumber(startValue)
        }
    }

    return (
        <div className={s.wrapper}>
            <div className={s.counter}>
                <div className={s.settings}>
                    <div>Max value:<input onChange={changeMaxValue} value={maxValue} type={'number'}/></div>
                    <div>Start value:<input onChange={changeStartValue} value={startValue} type={'number'}/></div>
                </div>
                <div className={s.buttons}>
                    <Button name={'set'} callBack={setButton}
                            disabled={maxValue <= startValue || startValue < 0 || maxValue < 0}/>
                </div>
            </div>
            <div className={s.counter}>
                {startValue<0 || maxValue<0
                    ? <div className={s.tablo}>error</div>
                    : <div className={number === maxValue ? (`${s.tabloChange} + ${s.tablo}`) : s.tablo}>{number}</div>}
                <div className={s.buttons}>
                    <Button name={'inc'} callBack={numberChange} disabled={disableButton}/>
                    <Button name={'reset'} callBack={numberReset} disabled={number === 0}/>
                </div>
            </div>
        </div>
    );
};
