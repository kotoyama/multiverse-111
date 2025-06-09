import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { User } from '@repo/shared-types'

export interface UserState {
  currentUser: User | null
  isAuthenticated: boolean
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
    },
    logoutUser: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
    },
    setKycStatus: (state, action: PayloadAction<boolean>) => {
      if (state.currentUser) {
        state.currentUser.isKYCApproved = action.payload
      }
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.currentBalance += action.payload
        state.currentUser.depositCount += 1
      }
    },
  },
})

export const { loginUser, logoutUser, updateBalance, setKycStatus } =
  userSlice.actions
export const userReducer = userSlice.reducer
