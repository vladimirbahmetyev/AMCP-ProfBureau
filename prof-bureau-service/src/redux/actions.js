import {
        LOGIN, LOGOUT,
        CHANGE_PAGE,
        SET_COMISSION,
        SET_INFO,
        TO_PERS_ACC, TO_MAIN_PAGE
    } from "./actionTypes"

export const login = userInfo =>({
    type:LOGIN,
    userInfo: userInfo
})

export const logout = () => ({type:LOGOUT})

export const changePage = newPage => ({
    type: CHANGE_PAGE,
    newPage: newPage
})

export const toPersAcc = ()=>({type:TO_PERS_ACC})

export const toMainAcc = ()=>({type:TO_MAIN_PAGE})

export const setComInfo = name => ({ type:SET_COMISSION, name: name})

export const setUserInfo = info => ({type: SET_INFO, info:info})