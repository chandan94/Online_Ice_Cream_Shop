import { createSelector } from 'reselect';
import { UserState } from './user.types';

const selectUser = (state: any)  => state.user;

export const selectCurrUser = createSelector(
    selectUser,
    user => user.currentUser,
);
export const selectIsAdminUser = createSelector(
    [selectUser],
    (user : UserState) => user.isAdmin,
);

export const selectCurrentUser = createSelector(
    [selectUser],
    (user : UserState) => user.currentUser,
);
