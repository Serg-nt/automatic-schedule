import React, {ChangeEvent, KeyboardEventHandler, useState} from 'react';
import {AddBox} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";

type PropsType = {
    addUser: (fullName: string) => void,
}

export const AddUser = (props: PropsType) => {
    let [title, setTitle] = useState("");

    const addItemHandler = () => {
        props.addUser(title.trim())
        setTitle("");
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItemHandler();
        }
    };

    return (
        <div>
            <TextField sx={{margin: 1, width: '350px', height: '70px'}}
                       variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       label="Добавить представителя"
            />
            <IconButton color="primary" onClick={addItemHandler} sx={{marginTop: 2, alignItems: 'center'}}>
                <AddBox/>
            </IconButton>
        </div>
    );
};
