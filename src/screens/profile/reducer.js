import Actions from '../../redux/actionTypes';
const STATE_INICIAL = {
    input: '',
}
    
export default ( state = STATE_INICIAL, action ) => {
    switch(action.type){
        case Actions.ACTUALIZARINPUT:
            return {...state, input: action.carga  };
        default:
            return {...state };
    }
}