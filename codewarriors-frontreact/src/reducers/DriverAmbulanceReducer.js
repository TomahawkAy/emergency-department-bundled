const initialState = {
    CurrentWay:null,
    done:false,
};

export default function NurceAmbulanceReducer(state = initialState, action) {
    switch (action.type) {

        case 'SET_CURRENT_WAY':
            return {
                ...state,
                CurrentWay:action.payload.CurrentWay
            }
        case 'SET_DONE':
            return {
                ...state,
                done:true
            }

        default:
            return state
    }
}

