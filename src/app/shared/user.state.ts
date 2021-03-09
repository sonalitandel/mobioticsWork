import {UserData}from '../models/UserDetails.model';

export default class ToDoState {
    UserDataArr: Array<UserData>;
  ToDoError: Error;
}

export const initializeState = (): ToDoState => {
  return { UserDataArr: Array<UserData>(), ToDoError: null };
};