import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface MainState {
    loading: boolean
    cardOpen: boolean
}

const initialState: MainState = {
    loading: false,
    cardOpen: false
}
export const mainSlice = createSlice({
    name: 'main',
    initialState: initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setCardOpen: (state, action: PayloadAction<boolean>) => {
            state.cardOpen = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLoading, setCardOpen } = mainSlice.actions
export default mainSlice.reducer