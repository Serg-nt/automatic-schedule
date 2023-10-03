import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Date, User} from "../../interfaces/types";
import {usersThunks} from "./users/users.reducer";
import {SheduleTable} from "./SheduleTable";
import {useAppDispatch} from "../hooks";

type PropsType = {
    changeDaysOn: boolean
}

export const SheduleTableContainer: React.FC<PropsType> = ({changeDaysOn}) => {

    const usersList: User[] = useSelector((state: AppRootStateType) => state.users)
    const dispatch = useAppDispatch()

    const daysList = Object.values(Date);

    const removeUser = (_id: string) => {
        dispatch(usersThunks.removeUser(_id))
    }

    const changeUserDayCellClick = (userId: string, day: string, isPersonalWeekend: boolean, isDefinedWeekend: boolean) => {

        const user = usersList.find(user => user._id === userId);
        if (!user) return;

        if (changeDaysOn) {
            const newArrPersonalWeekends = !isPersonalWeekend
                ? [...user.personalWeekends, day]
                : user.personalWeekends.filter(elem => elem !== day.toString())

            if (isDefinedWeekend) {

                const newArrDefinedWeekends = user.definedWeekends.filter(elem => elem !== day.toString())
                dispatch(usersThunks.setWeekend({user, newArrPersonalWeekends, newArrDefinedWeekends}))

            } else {
                dispatch(usersThunks.setPersonalWeekend({user, newArrPersonalWeekends}))
            }



        } else {
            if (!isPersonalWeekend) {
                const newArrDefinedWeekends = isDefinedWeekend
                    ? user.definedWeekends.filter(elem => elem !== day.toString())
                    : [...user.definedWeekends, day]
                dispatch(usersThunks.setDefinedWeekend({user, newArrDefinedWeekends}))
            } else alert('Включите возможность корректировки важных выходных')
        }

    }

    return (
        <>
            <SheduleTable
                usersList={usersList}
                daysList={daysList}
                changeUserDayCellClick={changeUserDayCellClick}
                removeUser={removeUser}
            />
        </>
    );
};
