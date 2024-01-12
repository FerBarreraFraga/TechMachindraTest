import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types';

export interface UserState {
  users: User[];
  deletedAlbums: Record<number, number[]>;
  loadingAlbums: boolean;
}

const initialState: UserState = {
  users: [],
  deletedAlbums: {},
  loadingAlbums: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    deleteAlbum: (
      state,
      action: PayloadAction<{userId: number; albumId: number}>,
    ) => {
      const {userId, albumId} = action.payload;
      state.deletedAlbums[userId] = [
        ...(state.deletedAlbums[userId] || []),
        albumId,
      ];
    },
    setLoadingAlbums: (state, action: PayloadAction<boolean>) => {
      state.loadingAlbums = action.payload;
    },
  },
});

export const {setUsers, deleteAlbum, setLoadingAlbums} = userSlice.actions;
export default userSlice.reducer;
