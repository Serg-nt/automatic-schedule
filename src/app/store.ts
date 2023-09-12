import {combineReducers} from "redux";
import {AnyAction, configureStore, ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";
import {usersReducer} from "../common/components/users/users.reducer";


const rootReducer = combineReducers({
    users: usersReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store