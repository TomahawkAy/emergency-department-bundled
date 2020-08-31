const initialState = {
    nbTab: 1,
    taskIdChoosed: null,
    searchData: [],
    coord: {lat: 36.899576, lng: 10.189887},

};

export default function NurceAmbulanceReducer(state = initialState, action) {
    switch (action.type) {

        case 'SET_TAB':
            return {
                ...state,
                nbTab: action.payload.index
            }
        case 'SET_SEARCH_DATA':
            return {
                ...state,
                searchData: action.payload.searchData
            }
        case 'SET_COORD':
            return {
                ...state,
                coord: {lat: action.payload.latitude, lng: action.payload.longitude},
            }

            case 'SET_TASK_ID_CHOOSED':
            return {
                ...state,
                taskIdChoosed: action.payload.id,
            }


        case 'RESET_TASK_ID_CHOOSED':
            return {
                ...state,
                taskIdChoosed: null,
            }
        default:
            return state
    }
}

