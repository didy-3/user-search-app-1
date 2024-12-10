import './Search.scss'
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../utils/hooks";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { getUsersByKey } from '../services/userService';
import { setLoading } from '../store/main';
import { setUsers } from '../store/users';

export function Search() {
    const dispatch = useAppDispatch()
    const lookupFields: string[] = ["id", "name", "username", "email", "phone", "website"]
    const [searchKey, setSearchKey] = useState<string>('')
    const [searchText, setSearchText] = useState<string>('')
    const [validation, setValidation] = useState<boolean>(false)
    const [invalidForm, setInvalidform] = useState<boolean>(false)
    async function searchData() {
        setValidation(true)
        if (searchKey === '') {
            setInvalidform(true);
            return;
        }
        dispatch(setLoading(true));
        try {
            const data = await getUsersByKey(searchKey, searchText);
            dispatch(setLoading(false));
            dispatch(setUsers(data));
        } catch (error) {
            dispatch(setLoading(false));
        }
    }
    function handleKeyChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchKey(e.target.value)
        if (invalidForm) setInvalidform(false)
    }
    return (
        <div className='search-wrapper'>
            <div className='search-input-wrapper'>
                <TextField
                    error={validation && searchKey == ''}
                    sx={{
                        minWidth: 150,
                        '& .MuiSelect-select': {
                            textAlign: 'left',
                        }
                    }}
                    required
                    select
                    label="Поле поиска"
                    value={searchKey} onChange={handleKeyChange}
                >
                    {lookupFields.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    sx={{
                        minWidth: 300,
                    }}
                    label="Поиск"
                    placeholder="Введите текст"
                    variant="outlined"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} />
                <Button variant="outlined" onClick={searchData}>Искать</Button>
            </div>
            {
                invalidForm ?
                    <Alert severity="error">Не обходимо выбрать поле поиска</Alert> : ''
            }
        </div>
    )
}
