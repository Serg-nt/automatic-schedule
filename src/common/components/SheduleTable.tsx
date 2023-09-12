import React from 'react';
import {TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {TableCellUserDay} from "./TableCellUserDay";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Date} from "../../interfaces/types";
import {usersActions} from "./users/users.reducer";
import {createTheme, ThemeProvider} from '@mui/material/styles';

export const SheduleTable = () => {

    const theme = createTheme({
        palette: {
            primary: {main: '#98FB98'},
            secondary: {main: '#66CDAA'},
            info: {main: '#B0E0E6'},
    }});

    const usersList = useSelector((state: AppRootStateType) => state.users)
    const dispatch = useDispatch()

    const daysList = Object.values(Date);

    const onUserDayCellClick = (userId: string, day: string) => {
        // if(usersList.some(user => user.id === userId & user.)) {
        //     console.log(!usersList.some(user => user.id === userId), 'id add')
        //     dispatch(usersActions.changeUsersDefinedWeekendsDays({id: userId, day}))
        // }
        dispatch(usersActions.addUsersDefinedWeekendsDays({id: userId, day}))
        }

    return (
        <>
            <ThemeProvider theme={theme}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{bgcolor: 'primary.main'}}>
                                <TableCell>Представители</TableCell>
                                <TableCell></TableCell>
                                {daysList.map((day, index) =>
                                    <TableCell
                                        key={index}
                                        align="center"
                                        sx={{width: '50px'}}
                                    >{day.toUpperCase()}</TableCell>)}
                            </TableRow>
                            <TableRow>
                                <TableCell>Предст. в день</TableCell>
                                <TableCell>Смен</TableCell>
                                {daysList.map((day, index) => <TableCell align="center" key={day}>

                                    {/*????*/}

                                    {/*{usersList.reduce((acc, user) => {*/}
                                    {/*    if ([...user.personalWeekends, ...user.definedWeekends].includes(day)) acc++*/}
                                    {/*    return acc;*/}
                                    {/*}, 0)}*/}


                                </TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersList.map((user) => (
                                <TableRow
                                    key={user._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.fullName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {/*{[...user.personalWeekends, ...user.definedWeekends].length}*/}
                                    </TableCell>

                                    {daysList.map(day =>
                                        <TableCellUserDay
                                            key={day}
                                            day={day}
                                            user={user}
                                            onClick={() => onUserDayCellClick(user._id, day)}
                                        ></TableCellUserDay>)}

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ThemeProvider>
        </>
    );
};
