import {User} from "../../../interfaces/types";
import {createSlice} from "@reduxjs/toolkit";
import {usersApi} from "../users/users.api";
import {createAppAsyncThunk} from "../../utils/create-app-async-thunk";


const fetchUsers = createAppAsyncThunk<{ users: User[] }, void>(
    "users/fetchUsers",
    async () => {
        const res = await usersApi.getUsers()
        return {users: res.data}
    },
);

const fetchSortedUsers = createAppAsyncThunk<{ users: User[] }, number>(
    "users/fetchSortedUsers",
    async (sort) => {
        const res = await usersApi.getSortedUsers(sort)
        return {users: res.data}
    },
);

const addUser = createAppAsyncThunk<User, string>(
    "users/addUser",
    async (fullName) => {
        const res = await usersApi.createUser(fullName)
        console.log(res.data)
        return res.data
    },
);

const removeUser = createAppAsyncThunk<string, string>(
    "users/removeUser",
    async (_id) => {
        await usersApi.removeUser(_id)
        return _id
    },
)

const setPersonalWeekend = createAppAsyncThunk<User, {user: User, newArrPersonalWeekends: string[]}>(
    "users/setPersonalWeekend",
    async (arg) => {
        try {
            const res = await usersApi.updateUser({
                _id: arg.user._id,
                fullName: arg.user.fullName,
                performance: arg.user.performance,
                comment: arg.user.comment,
                personalWeekends: arg.newArrPersonalWeekends,
                definedWeekends: arg.user.definedWeekends,
            })
            if (res.status === 200) {
                return res.data
            } else {
                return res.data.message
            }
        } catch (err) {
            console.log(err)
        }
    },
)

const setDefinedWeekend = createAppAsyncThunk<User, {user: User, newArrDefinedWeekends: string[]}>(
    "users/setDefinedWeekend",
    async (arg) => {
        try {
            const res = await usersApi.updateUser({
                _id: arg.user._id,
                fullName: arg.user.fullName,
                performance: arg.user.performance,
                comment: arg.user.comment,
                personalWeekends: arg.user.personalWeekends,
                definedWeekends: arg.newArrDefinedWeekends,
            })
            if (res.status === 200) {
                return res.data
            } else {
                return res.data.message
            }
        } catch (err) {
            console.log(err)
        }
    },
)

const setWeekend = createAppAsyncThunk<User, {user: User, newArrPersonalWeekends: string[], newArrDefinedWeekends: string[]}>(
    "users/setWeekend",
    async (arg) => {
        try {
            const res = await usersApi.updateUser({
                _id: arg.user._id,
                fullName: arg.user.fullName,
                performance: arg.user.performance,
                comment: arg.user.comment,
                personalWeekends: arg.newArrPersonalWeekends,
                definedWeekends: arg.newArrDefinedWeekends,
            })
            if (res.status === 200) {
                return res.data
            } else {
                return res.data.message
            }
        } catch (err) {
            console.log(err)
        }
    },
)


const initialState: User[] = [];

const slice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload.users
            })
            .addCase(fetchSortedUsers.fulfilled, (state, action) => {
                return action.payload.users
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.push(action.payload)
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                return state.filter( user => user._id !== action.payload)
            })
            .addCase(setPersonalWeekend.fulfilled, (state, action) => {
                const index = state.findIndex((user) => user._id === action.payload._id);
                if (index !== -1) {
                    state[index].personalWeekends = action.payload.personalWeekends;
                }
            })
            .addCase(setDefinedWeekend.fulfilled, (state, action) => {
                const index = state.findIndex((user) => user._id === action.payload._id);
                if (index !== -1) {
                    state[index].definedWeekends = action.payload.definedWeekends;
                }
            })
            .addCase(setWeekend.fulfilled, (state, action) => {
                const index = state.findIndex((user) => user._id === action.payload._id);
                if (index !== -1) {
                    state[index].personalWeekends = action.payload.personalWeekends;
                    state[index].definedWeekends = action.payload.definedWeekends;
                }
            })
    }
});

export const usersReducer = slice.reducer;
export const usersActions = {addUser, removeUser, setPersonalWeekend, setDefinedWeekend, setWeekend};
// export const usersActions = slice.actions;
export const usersThunks = { fetchUsers, fetchSortedUsers, addUser, removeUser, setPersonalWeekend, setDefinedWeekend, setWeekend }
