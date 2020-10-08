import Actions from '../../redux/actionTypes';
const STATE_INICIAL = {
    error: false,
    message: '',
    logged: false,
    isLoading: false,
}
    
export default ( state = STATE_INICIAL, action ) => {
    const { isLoading } = action;
    switch(action.type){
        case Actions.LOGIN_SUCCESS:
            return {
                ...state,
                error: false,
                logged: true,
                isLoading: true
            };
        case Actions.LOGIN_ERROR:
            return {
                ...state,
                error: true,
                message: action.messageError,
                isLoading
            }
        case Actions.SET_LOADER:
            return {
                ...state,
                isLoading
            };
        default:
            return {...state };
    }
}