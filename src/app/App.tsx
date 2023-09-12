import React, {useEffect} from 'react';
import classes from './App.module.css'
import {SheduleTable} from "../common/components/SheduleTable";
import {AddUser} from "../common/components/AddUser";
import {usersThunks} from "../common/components/users/users.reducer";
import {useAppDispatch} from "../common/hooks";


function App() {
    const dispatch = useAppDispatch()



    useEffect( () => {
        dispatch(usersThunks.fetchUsers())
    }, [])

    const addUser = (fullName: string) => {
        dispatch(usersThunks.addUsers(fullName))
    }

    return (
        <div className={classes.appContainer}>
            <h1 style={{ textAlign: 'center' }}>Расписание на неделю</h1>
            <AddUser addUser={addUser}/>
            <SheduleTable/>
        </div>
    )
}

export default App;

