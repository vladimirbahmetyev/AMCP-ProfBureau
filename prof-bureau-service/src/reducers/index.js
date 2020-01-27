export default (state, action) => {
    console.log(action);
    switch(action.type) {
        case "SET_COMISSION": 
            return {
                ...state,
                comission: action.name
            };
        case "TO_MAIN_PAGE":
            return {
                ...state,
                comission: 'Профбюро',
                page: 'main'
            };
        case "CHANGE_PAGE":
            return {
                ...state,
                page: action.page
            };
        case "LOGIN":
            return {
                ...state,
                page: 'main',
                isAuthorized: true,
                login: action.login,
                course: action.course,
                stNum: action.stNum
            };
        case "SET_INFO":
            return {
                ...state,
                responseData: action.data,
                page: 'account'
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthorized: false,
                login: '',
                course: 0,
                stNum: 0,
                page: 'main'
            }
        default:
            return state;
    }
};