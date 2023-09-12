import React from 'react';
import {TableCell} from "@mui/material";
import {User} from "../../interfaces/types";


type Props = {
    user: User;
    day: string;
    onClick: () => void
}

export const TableCellUserDay = React.memo(({
                                    user,
                                    day,
                                    onClick
                                }: Props) => {

    let backgroundColor = null;

    // if(user.personalWeekends.includes(day)) {
    //     backgroundColor = {bgcolor: 'secondary.main'}
    // } else if(user.definedWeekends.includes(day)) {
    //     backgroundColor = {bgcolor: 'info.main'}
    // } else {
    //     backgroundColor = {bgcolor: ''}
    // }

    return (
        <TableCell
            align="center"
            sx={backgroundColor}
            onClick={onClick}
        >
            {day}
        </TableCell>
    )
        ;
});