import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {TableCellUserDay} from "./TableCellUserDay";
import {User} from "../../interfaces/types";

type ScheduleTableType = {
    usersList: User[]
    daysList: string[]
    changeUserDayCellClick: (userId: string, day: string, isPersonalWeekend: boolean, isDefinedWeekend: boolean) => void
    removeUser: (id: string) => void
}


export const SheduleTable: React.FC<ScheduleTableType> = ({
                                                             usersList,
                                                             daysList,
                                                             changeUserDayCellClick,
                                                             removeUser
                                                         }) => {

    const theme = createTheme({
        palette: {
            primary: {main: '#66CDAA'},
            secondary: {main: '#98FB98'},
            info: {main: '#c7e9ed'},
        }
    });

    const countMap: Record<string, number> = {
        'mon': 0,
        'tue': 0,
        'wed': 0,
        'thu': 0,
        'fri': 0,
        'sat': 0,
        'sun': 0
    }

    usersList.forEach(user => {
        const weekendsOfUser = [...user.definedWeekends, ...user.personalWeekends]
        weekendsOfUser.forEach(item => {
            countMap[item] = (countMap[item] || 0) + 1;
        });
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{bgcolor: 'primary.main'}}>
                                <TableCell sx={{minWidth: 250}}>
                                    Представители
                                </TableCell>
                                <TableCell></TableCell>
                                {daysList.map((day, index) =>
                                    <TableCell
                                        key={index}
                                        align="center"
                                        sx={{width: '50px'}}
                                    >{day.toUpperCase()}</TableCell>)}
                            </TableRow>
                            <TableRow>
                                <TableCell>Сегодня работают:</TableCell>
                                <TableCell></TableCell>
                                {daysList.map((day, index) => <TableCell align="center" key={day}>
                                    {usersList.length - countMap[day]}
                                </TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersList.map((user: User) => (
                                <TableRow
                                    key={user._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        <IconButton onClick={() => removeUser(user._id)} size="small">
                                            <CloseIcon/>
                                        </IconButton>
                                        {user.fullName}
                                    </TableCell>
                                    <TableCell component="th" scope="row" sx={{width: 50, textAlign : "center"}}>
                                        {7 - [...user.personalWeekends, ...user.definedWeekends].length}
                                    </TableCell>

                                    {daysList.map(day => {
                                            const isPersonalWeekend = user.personalWeekends.includes(day);
                                            const isDefinedWeekend = user.definedWeekends.includes(day);
                                            return (
                                        <TableCellUserDay
                                            key={day}
                                            onClick={() => changeUserDayCellClick(
                                                user._id,
                                                day,
                                                isPersonalWeekend,
                                                isDefinedWeekend
                                            )}
                                            isSelectedPersonalWeekend={isPersonalWeekend}
                                            isSelectedDefinedWeekend={isDefinedWeekend}
                                        />)}
                                        )}

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ThemeProvider>
        </>
    );
};

