import React, {useEffect, useState} from 'react';
import classes from './App.module.css'
import {SheduleTableContainer} from "../common/components/SheduleTableContainer";
import {AddUser} from "../common/components/AddUser";
import {usersThunks} from "../common/components/users/users.reducer";
import {useAppDispatch} from "../common/hooks";
import Grid from "@mui/material/Grid";
import Switch from '@mui/material/Switch';
import {Button, FormControlLabel, FormGroup} from "@mui/material";


function App() {
    const [changeDaysOn, setChangeDaysOn] = useState(false);

    const dispatch = useAppDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangeDaysOn(event.target.checked);
    };

    useEffect(() => {
        dispatch(usersThunks.fetchUsers())
    }, [])

    const addUser = (fullName: string) => {
        dispatch(usersThunks.addUser(fullName))
    }

    return (
        <div className={classes.appContainer}>
            <h1 style={{textAlign: 'center'}}>Расписание на неделю</h1>

            <Grid container sx={{ paddingBottom: "10px"}}>
                <FormGroup>
                    <FormControlLabel control={
                        <Switch
                            checked={changeDaysOn}
                            onChange={handleChange}
                        />} label='корректировать "обязательные" выходные' />
                </FormGroup>
            </Grid>
            <Grid container>
                <SheduleTableContainer changeDaysOn={changeDaysOn}/>
            </Grid>
            <Grid sx={{marginTop: '20px'}} container>
                <AddUser addUser={addUser}/>
                <Button sx={{height: '50px', margin: '10px 0 0 40px'}} variant="outlined" disabled>Распределить</Button>
                <div>
                    <p>B - необязательный выходной</p>
                    <p>B* - обязательный выходной</p>
                    <p>Р - рабочий день</p>
                </div>
            </Grid>
        </div>
    )
}

export default App;

