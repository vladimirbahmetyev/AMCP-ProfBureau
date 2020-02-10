import {
    LOGIN, LOGOUT,
    CHANGE_PAGE,
    TO_PERS_ACC, TO_MAIN_PAGE, SET_INFO,
    SET_COMISSION
} from "../actionTypes"

export default function(state, action) {
    console.log(action)
    switch(action.type){
    case LOGIN:{
        return {
            ...state,
                page: 'main',
                isAuthorized: true,
                name: action.userInfo.name,
                course: action.userInfo.course,
                stNum: action.userInfo.stNum
        }
    }
    case LOGOUT:{
        return{
            ...state,
                isAuthorized: false,
                login: '',
                course: 0,
                stNum: 0,
                name:"",
                page: 'main'
        }
    }
    case CHANGE_PAGE:{
        return{
            ...state,
            page: action.newPage
        }
    }
    case TO_PERS_ACC:{
        return{
            page: "persAcc"
        }
    }
    case TO_MAIN_PAGE:{
        return{
            ...state,
                comission: 'Профбюро',
                page: 'main'
        }
    }
    case SET_INFO:{
        return{
            ...state,
                responseData: action.data,
                page: 'account'
        }
    }
    case SET_COMISSION:{
        return {
            ...state,
            comission: action.name
        }
    }
    default: return state
    }
}