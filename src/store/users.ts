import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../interfaces/User'

interface UsersState {
    users: User[],
    curUser:User|null
}

const initialState: UsersState = {
    users: [],
    curUser: null
}
export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {            
            state.users = action.payload      
        },
        setCurUser: (state, action: PayloadAction<User|null>) => {            
            state.curUser = action.payload    
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUsers,setCurUser } = usersSlice.actions

export default usersSlice.reducer