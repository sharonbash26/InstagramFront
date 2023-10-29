import { userService } from "../services/user.service.js";
// import { socketService } from "../services/socket.service.js";
import { store } from '../store/store.js'

import { showErrorMsg } from '../services/event-bus.service.js'
// import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER, IMG_CHANGE, IMG_REMOVE } from "./user.reducer.js";
import { pstService } from "../services/pst.service.local.js";

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        // socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        // socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
        // socketService.logout()
        console.log('logout sucess')
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function updateUser(updatedUser) {
    try {
        console.log(updatedUser)
        const user = await userService.update(updatedUser)
        console.log(user)
        store.dispatch({ type: IMG_CHANGE, imgUrl: updatedUser.imgUrl })
    } catch (err) {
        console.log('Failed to update user', err)
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId);
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export async function loadUserLoggedPsts() {
    try {
        const loggedInUser = userService.getLoggedinUser();
        if (!loggedInUser) throw new Error('No user logged in');

        const userPsts = await pstService.query({ by: loggedInUser._id });
        // const userPsts = allPsts.filter(pst => pst.userId === loggedInUser._id);

        console.log('Psts for logged-in user:', userPsts);
        return userPsts

    } catch (err) {
        console.log('Cannot load psts', err);
        throw err;
    }
}
