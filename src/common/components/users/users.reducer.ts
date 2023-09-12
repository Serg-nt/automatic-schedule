import {User} from "../../../interfaces/types";
import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {usersApi} from "../users/users.api";
import {createAppAsyncThunk} from "../../utils/create-app-async-thunk";


const fetchUsers = createAppAsyncThunk<{ users: User[] }, void>(
    "users/fetchUsers",
    async () => {
        const res = await usersApi.getUsers()
        console.log(res.data)
        return {users: res.data}
    },
);

const addUsers = createAppAsyncThunk<any, string>(
    "users/addUsers",
    async (fullName) => {
        const res = await usersApi.createUser(fullName)
        console.log(res.data)
        return {users: res.data}
    },
);


const initialState: User[] = [];

const slice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUsersDefinedWeekendsDays: (state, action: PayloadAction<{ id: string, day: string }>) => {
            return state.map(user => {
                if (user._id === action.payload.id) {
                    return {
                        ...user,
                        definedWeekends: [...user.definedWeekends, action.payload.day]
                    };
                }
                return user;
            });
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload.users
            })
            .addCase(addUsers.fulfilled, (state, action) => {
                state.unshift(action.payload)
            })
    }
});

export const usersReducer = slice.reducer;
export const usersActions = slice.actions;
export const usersThunks = { fetchUsers, addUsers }
