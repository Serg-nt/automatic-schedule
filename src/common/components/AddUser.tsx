import React, {ChangeEvent, useState} from 'react';
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

    return (
        <div>
            <TextField sx={{ margin: 1, width: '350px', height: '70px'}}
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                label="Введите фамилию имя"
            />
            <IconButton color="primary" onClick={addItemHandler} sx={{ marginTop: 2, alignItems: 'center'}}>
                <AddBox />
            </IconButton>
        </div>
    );
};
