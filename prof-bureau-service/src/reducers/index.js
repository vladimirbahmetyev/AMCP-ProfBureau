export default (state, action) => {
    console.log(action);
    switch(action.type) {
        case "SET_COMISSION": 
            return {
                ...state,
                comission: action.name
            };
        default:
            return state;
    }
};