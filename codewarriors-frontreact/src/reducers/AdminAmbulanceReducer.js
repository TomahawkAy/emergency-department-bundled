const initialState = {
    nbTab: 1,
    intonbTab:11,
};

export default function NurceAmbulanceReducer(state = initialState, action) {
    switch (action.type) {

        case 'SET_TAB':
            return {
                ...state,
                nbTab: action.payload.index
            }
        case 'SET_INTO_TAB':
            return {
                ...state,
                intonbTab: action.payload.index
            }

        default:
            return state
    }
}

