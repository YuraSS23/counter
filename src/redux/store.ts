import {counterReducer} from "./reducer";
import {combineReducers, legacy_createStore} from "redux";
import {loadState, saveState} from "../utils/localStorage-utils";

export type RootStateType = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
    counter: counterReducer
})

export const store = legacy_createStore(rootReducer, loadState())

store.subscribe(() => {
    saveState(store.getState());
})
