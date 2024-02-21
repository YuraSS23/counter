export type InitialStateType = typeof initialState

const initialState = {
    currentValue: 0,
    disableButton: true,
    maxValue: 1,
    startValue: 0,
    valueChanges: true
}

export const counterReducer  = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "NUMBER-CHANGE" : {
            if (state.currentValue < state.maxValue - 1) {
                return {...state, currentValue: state.currentValue+1, disableButton: false}
            } else {
                return {...state, currentValue: state.currentValue+1, disableButton: true}
            }
        }
        case "NUMBER-RESET" : {
            return {...state, currentValue: state.startValue, disableButton: false}
        }
        case "CHANGE-MAX-VALUE": {
            return {...state, maxValue: action.maxValue, disableButton: true, valueChanges: true}
        }
        case "CHANGE-START-VALUE": {
            return {...state, startValue: action.startValue, disableButton: true, valueChanges: true}
        }
        case "SET-START-VALUE": {
            return {...state, currentValue: state.startValue, disableButton: false, valueChanges: false}
        }
        default : {
            return state
        }
    }
}

type ActionType = numberChangeACType | numberResetACType | changeMaxValueACType
    | changeStartValueACType
    | setStartValueACType

type numberChangeACType = ReturnType<typeof numberChangeAC>

export const numberChangeAC = () => {
    return {
        type: "NUMBER-CHANGE"
    } as const
}

type numberResetACType = ReturnType<typeof numberResetAC>

export const numberResetAC = () => {
    return {
        type: "NUMBER-RESET"
    } as const
}

type changeMaxValueACType = ReturnType<typeof changeMaxValueAC>

export const changeMaxValueAC = (maxValue : number) => {
    return {
        type: "CHANGE-MAX-VALUE",
        maxValue: maxValue
    } as const
}

type changeStartValueACType = ReturnType<typeof changeStartValueAC>

export const changeStartValueAC = (startValue: number) => {
    return {
        type: "CHANGE-START-VALUE",
        startValue: startValue
    } as const
}

type setStartValueACType = ReturnType<typeof setStartValueAC>

export const setStartValueAC = () => {
    return {
        type: "SET-START-VALUE",
    } as const
}
