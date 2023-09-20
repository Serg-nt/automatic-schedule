import React from 'react';
import {TableCell} from "@mui/material";


type Props = {
    isSelectedPersonalWeekend: boolean;
    isSelectedDefinedWeekend: boolean;
    onClick: () => void
}

export const TableCellUserDay = React.memo(({
                                                isSelectedPersonalWeekend,
                                                isSelectedDefinedWeekend,
                                                onClick
                                            }: Props) => {





    const bc = isSelectedPersonalWeekend
        ? 'primary.main'
        : (isSelectedDefinedWeekend ? 'secondary.main' : 'info.main')


    return (
        <TableCell
            align="center"
            sx={{bgcolor: bc}}
            onClick={() => onClick()}
        >
            {isSelectedPersonalWeekend
                ? 'В*'
                : (isSelectedDefinedWeekend ? 'B' : 'P')
            }
        </TableCell>
    )
        ;
});